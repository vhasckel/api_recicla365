const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateToken = require("../middlewares/validationToken");

const usersRoutes = new Router();

usersRoutes.post(
  "/cadastrar",
  UserController.createAccount /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para criar uma nova conta de usuário'
    #swagger.parameters['createAccount'] = {
        in: 'body',
        description: 'Dados do novo usuário',
        required: true,
        schema: {
            $name: "Nome do Usuário",
            $gender: "feminino",
            $cpf: "99999999999",
            $cep: "88036280",
            $neighbourhood: "trindade",
            $street: "prof. enoe schutel",
            $number: 286,
            $email: "email@exemplo.com",
            $passwordHash: "senha123"
        }
    }
    #swagger.responses[201] = {
        description: 'Usuário criado com sucesso'
    }
    #swagger.responses[400] = {
        description: 'Erro de validação'
    }
  */
);
usersRoutes.delete(
  "/deletar/:id",
  validateToken,
  UserController.deleteAccount /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para deletar uma conta de usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.responses[204] = {
        description: 'Usuário deletado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado'
    }
    #swagger.responses[403] = {
        description: 'Usuário não tem permissão para deletar esta conta'
    }
  */
);
usersRoutes.put(
  "/atualizar/:id",
  validateToken,
  UserController.updateAccount /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para atualizar uma conta de usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.parameters['updateAccount'] = {
        in: 'body',
        description: 'Dados atualizados do usuário',
        required: true,
        schema: {
            $name: "Nome Atualizado",
            $gender: "feminino",
            $cpf: "99999999999",
            $cep: "88036280",
            $neighbourhood: "trindade",
            $street: "prof. enoe schutel",
            $number: 286,
            $email: "email@exemplo.com",
            $passwordHash: "novaSenha123"
        }
    }
    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado'
    }
    #swagger.responses[403] = {
        description: 'Usuário não tem permissão para atualizar esta conta'
    }
  */
);
usersRoutes.get(
  "/",
  validateToken,
  UserController.getAllUsers /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para obter todos os usuários'
    #swagger.responses[200] = {
        description: 'Lista de usuários'
    }
    #swagger.responses[404] = {
        description: 'Nenhum usuário encontrado'
    }
  */
);

module.exports = usersRoutes;
