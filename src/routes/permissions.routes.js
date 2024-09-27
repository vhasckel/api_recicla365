const { Router } = require("express");
const PermissionController = require("../controllers/PermissionController");
const verifyPermission = require("../middlewares/verifyPermission");
const validateToken = require("../middlewares/validationToken");

const permissionsRoutes = new Router();

permissionsRoutes.post(
  "/",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.createPermission
  /*
    #swagger.tags = ['Permissões']
    #swagger.description = 'Endpoint para criar uma permissão'
    #swagger.parameters['createPermission'] = {
        in: 'body',
        description: 'Dados da permissão',
        required: true,
        schema: {
            $description: "Descrição da permissão"
        }
    }
    #swagger.responses[201] = {
        description: 'Permissão criada com sucesso'
    }
    #swagger.responses[400] = {
        description: 'Erro de validação: descrição é obrigatória'
    }
  */
);
permissionsRoutes.get(
  "/",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.getAllPermissions
  /*
    #swagger.tags = ['Permissões']
    #swagger.description = 'Endpoint para buscar todas as permissões'
    #swagger.responses[200] = {
        description: 'Lista de permissões'
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar permissões'
    }
  */
);
permissionsRoutes.delete(
  "/:id",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.deletePermission
  /*
    #swagger.tags = ['Permissões']
    #swagger.description = 'Endpoint para deletar uma permissão por ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da permissão',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.responses[204] = {
        description: 'Permissão deletada com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Permissão não encontrada'
    }
    #swagger.responses[500] = {
        description: 'Erro ao deletar permissão'
    }
  */
);

permissionsRoutes.post(
  "/assign",
  validateToken,
  PermissionController.assignPermission
  /*
    #swagger.tags = ['Permissões']
    #swagger.description = 'Endpoint para atribuir uma permissão a um usuário'
    #swagger.parameters['assignPermission'] = {
        in: 'body',
        description: 'Dados para atribuição de permissão',
        required: true,
        schema: {
            $userId: 1,
            $permissionId: 2
        }
    }
    #swagger.responses[204] = {
        description: 'Permissão atribuída com sucesso'
    }
    #swagger.responses[400] = {
        description: 'Erro de validação: userId e permissionId são obrigatórios'
    }
    #swagger.responses[404] = {
        description: 'Usuário ou permissão não encontrados'
    }
    #swagger.responses[500] = {
        description: 'Erro ao atribuir permissão'
    }
  */
);

module.exports = permissionsRoutes;
