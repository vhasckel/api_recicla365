const {
  createUserRegisterSchema,
  partialUpdateSchema,
} = require("../middlewares/validationSchemas");
const { RecyclingPoint } = require("../models");
const Permission = require("../models/Permission");
const User = require("../models/User");
const handleError = require("../services/handleErros.service");

class UserController {
  async getAllUsers(request, response) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name"],
      });

      if (users.length === 0) {
        return response
          .status(404)
          .json({ message: "Não foi encontrado nenhum usuário" });
      }
      return response.status(200).json(users);
    } catch (error) {
      handleError(response, "Erro ao buscar usuários", error);
    }
  }
  async createAccount(request, response) {
    try {
      const validatedData = await createUserRegisterSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const {
        name,
        gender,
        cpf,
        cep,
        city,
        state,
        neighbourhood,
        street,
        number,
        birthdate,
        email,
        passwordHash,
      } = validatedData;

      // verifica se o usuário tem permissão para criar um administrador
      if (
        request.userPermission !== "adm" &&
        validatedData.permission === "adm"
      ) {
        return response.status(403).json({
          message: "Você não tem permissão para criar um administrador.",
        });
      }

      const [emailVerify, cpfVerify] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { cpf } }),
      ]);

      if (emailVerify) {
        return response
          .status(409)
          .json({ message: "Este e-mail já está em uso." });
      }

      if (cpfVerify) {
        return response
          .status(409)
          .json({ message: "Este CPF já está cadastrado." });
      }

      const user = await User.create({
        name,
        gender,
        cpf,
        cep,
        city,
        state,
        neighbourhood,
        street,
        number,
        birthdate,
        email,
        passwordHash,
      });

      // obtém a permissão padrão "user"
      const userPermission = await Permission.findOne({
        where: { description: "user" },
      });

      // verifica se a permissão foi encontrada
      if (userPermission) {
        console.log("Permissão encontrada:", userPermission);
        try {
          // associa a permissão ao usuário
          await user.addPermission(userPermission.id);
          console.log("Associação realizada com sucesso.");
        } catch (err) {
          console.error("Erro ao associar permissão:", err);
        }
      } else {
        console.error("Permissão 'user' não encontrada.");
      }

      response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        permission: "user",
        createdAt: user.createdAt,
      });
    } catch (error) {
      handleError(response, "Não foi possível cadastrar usuário.", error);
    }
  }

  async deleteAccount(request, response) {
    try {
      const { id } = request.params;
      const account = await User.findByPk(id);

      if (!account) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      if (account.id !== request.userId) {
        return response.status(403).json({
          message:
            "Você não tem permissão para deletar a conta de outro usuário.",
        });
      }

      const recyclingPoints = await RecyclingPoint.findAll({
        where: { userId: id },
      });

      if (recyclingPoints.length > 0) {
        return response.status(403).json({
          message:
            "Não é possível deletar a conta. Existem pontos de coleta vinculados a este usuário.",
        });
      }
      await account.destroy();

      return response.status(204).send();
    } catch (error) {
      handleError(response, "Erro ao deletar usuário", error);
    }
  }

  async updateAccount(request, response) {
    try {
      const { id } = request.params;

      const validatedData = await partialUpdateSchema.validate(request.body, {
        abortEarly: false,
      });

      const updatedAccount = await User.findByPk(id);

      if (!updatedAccount) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      // verifica se o CPF está sendo alterado
      if (validatedData.cpf) {
        return response.status(403).json({
          message: "Alteração do CPF não é permitida",
        });
      }

      if (updatedAccount.id !== request.userId) {
        return response.status(403).json({
          message: "Você não tem permissão para atualizar esta conta",
        });
      }

      Object.assign(updatedAccount, validatedData);
      await updatedAccount.save();

      return response.status(200).json(updatedAccount);
    } catch (error) {
      handleError(response, "Erro ao atualizar conta", error);
    }
  }
}

module.exports = new UserController();
