const {
  createUserRegisterSchema,
} = require("../middlewares/validationSchemas");
const User = require("../models/User");

class UserController {
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
}

module.exports = new UserController();
