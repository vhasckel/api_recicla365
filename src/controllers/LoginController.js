const { compareSync } = require("bcryptjs");
const User = require("../models/User");
const { sign } = require("jsonwebtoken");
const handleError = require("../services/handleErros.service");

class LoginController {
  async login(request, response) {
    try {
      const data = request.body;

      if (!data.email || !data.passwordHash) {
        return response
          .status(400)
          .json({ mensagem: "Nome e senha são obrigatórios" });
      }

      const user = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return response
          .status(404)
          .json({ mensagem: "Este e-mail não pertence a nenhuma conta." });
      }

      const passwordValidate = compareSync(
        data.passwordHash,
        user.passwordHash
      );

      if (passwordValidate === false) {
        return response
          .status(404)
          .json({ mensagem: "E-mail ou senha incorretos." });
      }

      const token = sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return response.json({
        token: token,
        name: user.name,
      });
    } catch (error) {
      handleError(response, "Não foi possível realizar login", error);
    }
  }
}

module.exports = new LoginController();
