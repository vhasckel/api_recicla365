const Permission = require("../models/Permission");
const User = require("../models/User");

class PermissionController {
  async createPermission(request, response) {
    try {
      const { description } = request.body;

      if (!description) {
        return response
          .status(400)
          .json({ mensagem: "Descrição é obrigatória" });
      }

      const permission = await Permission.create({ description });
      return response.status(201).json(permission);
    } catch (error) {
      handleError(response, "Erro ao criar permissão", error);
    }
  }

  async getAllPermissions(request, response) {
    try {
      const permissions = await Permission.findAll();
      return response.json(permissions);
    } catch (error) {
      handleError(response, "Erro ao buscar permissões", error);
    }
  }

  async deletePermission(request, response) {
    try {
      const { id } = request.params;
      const permission = await Permission.findByPk(id);

      if (!permission) {
        return response
          .status(404)
          .json({ mensagem: "Permissão não encontrada" });
      }

      await permission.destroy();

      return response.status(204).send();
    } catch (error) {
      handleError(response, "Erro ao deletar permissão", error);
    }
  }

  async assignPermission(request, response) {
    try {
      const { userId, permissionId } = request.body;

      if (!userId || !permissionId) {
        return response
          .status(400)
          .json({ mensagem: "userId e permissionId são obrigatórios" });
      }

      const user = await User.findByPk(userId);
      const permission = await Permission.findByPk(permissionId);

      if (!user || !permission) {
        return response
          .status(404)
          .json({ mensagem: "Usuário ou permissão não encontrados" });
      }

      await user.addPermission(permission);

      return response.status(204).send();
    } catch (error) {
      handleError(response, "Erro ao atribuir permissão", error);
    }
  }
}

module.exports = new PermissionController();
