const User = require("../models/User");
const Yup = require("yup");

class UserController {
  async createAccount(request, response) {
    try {
      const data = request.body;

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
        name: data.name,
        gender: data.gender,
        cpf: data.cpf,
        cep: data.cep,
        neighbourhood: data.neighbourhood,
        street: data.street,
        number: data.number,
        email: data.email,
        passwordHash: data.passwordHash,
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
}

module.exports = new UserController();
