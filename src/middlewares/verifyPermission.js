const Permission = require("../models/Permission");
const User = require("../models/User");

const verifyPermission = (permissoesRequeridas) => {
  return async (request, response, next) => {
    try {
      const { userId } = request;
      console.log(`Verifying permissions for User ID: ${userId}`);

      const user = await User.findByPk(userId, {
        include: {
          model: Permission,
          as: "permissions",
          attributes: ["description"],
        },
      });

      if (!user) {
        console.log(`Usuário com ID ${userId} não encontrado`);
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado" });
      }

      // obtém as permissões do usuário
      const userPermissions = user.permissions.map((perm) => perm.description);
      console.log(`Permissões do usuário: ${userPermissions}`);

      // verifica se o usuário possui alguma das permissões necessárias
      const isAllowed = permissoesRequeridas.some((perm) =>
        userPermissions.includes(perm)
      );

      console.log(`Permissões necessárias: ${permissoesRequeridas}`);
      console.log(`Permissão concedida: ${isAllowed}`);

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
