const Permission = require("../models/Permission");
const User = require("../models/User");

class PermissionController {
  async createPermission(request, response) {
    try {
      const description = request.body;

      const permission = await Permission.create(description);
      response.status(201).json(permission);
    } catch (error) {
      console.error(error);
      response.status(500).json({
        mensagem: "Houve um erro ao cadastrar a permissao",
      });
    }
  }

  async getAllPermissions(request, response) {
    try {
      const permissions = await Permission.findAll();
      response.json(permissions);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao listar as permissoes",
      });
    }
  }

  async deletePermission(request, response) {
    try {
      const id = request.params.id;
      const permission = await Permission.findByPk(id);

      if (!permission) {
        response
          .status(404)
          .json({ mensagem: "Não foi encontrado a permissao" });
      }

      await permission.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao deletar a permissao",
      });
    }
  }

  async assignPermission(request, response) {
    try {
      const { userId, permissionId } = request.body;

      const user = await User.findByPk(userId);
      const permission = await Permission.findByPk(permissionId);

      if (!user || !permission) {
        response
          .status(404)
          .json({ mensagem: "Usuário ou permissão não encontrados" });
      }

      await user.addPermission(permission);

      // await permission.addUser(user);

      response.status(204).json();
    } catch (error) {
      console.log(error);
      response.status(500).json({ mensagem: "A requisição falhou" });
    }
  }
}

module.exports = new PermissionController();
