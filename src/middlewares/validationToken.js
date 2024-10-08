const { verify } = require("jsonwebtoken");

function validateToken(request, response, next) {
  try {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(400).json({ message: "Token não anexado" });
    }

    const auth = token.split(" ");

    const result = verify(auth[1], process.env.JWT_SECRET);

    request.userId = result.id;
    console.log(`User ID from token: ${request.userId}`);

    next();
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed" || error.message === "jwt expired") {
      response
        .status(401)
        .json({ mensagem: "O Token está inválido ou expirado" });
    } else {
      response.status(500).json({ mensagem: "A requisição falhou" });
    }
  }
}

module.exports = validateToken;
