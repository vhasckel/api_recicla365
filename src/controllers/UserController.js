const {
  createUserRegisterSchema,
} = require("../middlewares/validationSchemas");
const { RecyclingPoint } = require("../models");
const User = require("../models/User");

class UserController {
  async getAllUsers(request, response) {
    try {
      const users = await User.findAndCountAll({
        attributes: ["id", "name"],
      });

      if (users.length === 0) {
        response
          .status(404)
          .json({ message: "Não foi encontrado nenhum usuário" });
      }
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao buscar pontos de coleta",
        error: error.message,
      });
    }
  }
  async createAccount(request, response) {
    try {
      const data = request.body;

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
        User.findOne({ where: { email: data.email } }),
        User.findOne({ where: { cpf: data.cpf } }),
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
      console.error(error);
      response
        .status(500)
        .json({ message: "Não foi possível cadastrar usuário." });
    }
  }

  async deleteAccount(request, response) {
    try {
      const id = request.params.id;
      const account = await User.findByPk(id);

      if (!account) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      if (account.id !== request.userId.id) {
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

      return response.status(204).json();
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao deletar usuário",
        error: error.message,
      });
    }
  }

  async updateAccount(request, response) {
    try {
      const id = request.params.id;
      const validatedData = await createUserRegisterSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const updatedAccount = await User.findByPk(id);

      if (!updatedAccount) {
        response.status(404).json({ message: "Usuário não encontrado" });
      }

      if (updatedAccount.id !== request.userId.id) {
        return response.status(403).json({
          message: "Você não tem permissão para atualizar esta conta",
        });
      }

      Object.assign(updatedAccount, validatedData);
      await updatedAccount.save();

      return response.status(200).json(updatedAccount);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao atualizar conta",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
