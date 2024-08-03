const Permission = require("../models/Permission");
const User = require("../models/User");

class PermissionController {
  constructor() {
    //vinculando o método handleError ao contexto da instância
    this.handleError = this.handleError.bind(this);
  }
  async createPermission(request, response) {
    try {
      const { description } = request.body;

      if (!description) {
        return response
          .status(400)
          .json({ mensagem: "Descrição é obrigatória" });
      }

      const permission = await Permission.create({ description });
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
      this.handleError(
        response,
        "Houve um erro ao listar as permissões",
        error
      );
    }
  }

  async deletePermission(request, response) {
    try {
      const { id } = request.params;
      const permission = await Permission.findByPk(id);

      if (!permission) {
        response.status(404).json({ mensagem: "Permissão não encontrada" });
      }

      await permission.destroy();

      return response.status(204).send();
    } catch (error) {
      this.handleError(response, "Houve um erro ao deletar a permissão", error);
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
        response
          .status(404)
          .json({ mensagem: "Usuário ou permissão não encontrados" });
      }

      await user.addPermission(permission);

      return response.status(204).send();
    } catch (error) {
      this.handleError(response, "A requisição falhou", error);
    }
  }

  handleError(response, mensagem, error) {
    console.error(error);
    return response.status(500).json({ mensagem });
  }
}

module.exports = new PermissionController();
