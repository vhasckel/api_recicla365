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
          through: {
            attributes: [],
          },
        },
      });

      if (!user) {
        console.log(`User with ID ${userId} not found`);
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado" });
      }

      const userPermissions = user.permissions.map((p) => p.description);
      console.log(`User permissions: ${userPermissions}`);

      const isAllowed = permissoesRequeridas.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!isAllowed) {
        return response
          .status(401)
          .json({ mensagem: "Usuário não tem uma ou mais permissões" });
      }

      next();
    } catch (error) {
      console.error(error);
      response.status(500).json({ mensagem: "A requisição falhou" });
    }
  };
};

module.exports = verifyPermission;
