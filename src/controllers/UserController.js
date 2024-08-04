const {
  createUserRegisterSchema,
} = require("../middlewares/validationSchemas");
const { RecyclingPoint } = require("../models");
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
        neighbourhood,
        street,
        number,
        email,
        passwordHash,
      } = validatedData;

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
        neighbourhood,
        street,
        number,
        email,
        passwordHash,
      });

      response.status(201).json({
        name: user.name,
        email: user.email,
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
      const validatedData = await createUserRegisterSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const updatedAccount = await User.findByPk(id);

      if (!updatedAccount) {
        return response.status(404).json({ message: "Usuário não encontrado" });
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
