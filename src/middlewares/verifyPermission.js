const User = require("../models/User");

const verifyPermission = (permissoesRequeridas) => {
  return async (request, response, next) => {
    try {
      const { userId } = request;
      console.log(`Verifying permissions for User ID: ${userId}`);

      const user = await User.findByPk(userId);

      if (!user) {
        console.log(`User with ID ${userId} not found`);
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado" });
      }

      // Acesso direto ao campo permission do usuário
      const userPermission = user.permission; // Assume que o campo permission é uma string
      console.log(`User permission: ${userPermission}`);

      // Verifica se o usuário possui a permissão necessária
      const isAllowed = permissoesRequeridas.includes(userPermission);
      console.log(`Is allowed: ${isAllowed}`);
      console.log(`Required Permissions: ${permissoesRequeridas}`);
      console.log(`User ID: ${userId}`);

      if (!isAllowed) {
        return response
          .status(401)
          .json({ mensagem: "Usuário não tem permissão necessária" });
      }

      next();
    } catch (error) {
      console.error(error);
      response.status(500).json({ mensagem: "A requisição falhou" });
    }
  };
};

module.exports = verifyPermission;
