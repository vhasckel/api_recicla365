const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateToken = require("../middlewares/validationToken");
const verifyPermission = require("../middlewares/verifyPermission");

const usersRoutes = new Router();

usersRoutes.post(
  "/create",
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
            $birthdate: "01/01/2000",
            $cep: "88036280",
            $neighbourhood: "trindade",
            $street: "prof. enoe schutel",
            $city: "Florianópolis",
            $state: "SC",
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
  "/delete/:id",
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
usersRoutes.patch(
  "/update/:id",
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
            $name: "Nome Completo",
            $birthdate: "1995-05-05",
            $gender: "feminino",
            $cpf: "99999999999",
            $cep: "88036280",
            $city: "Cidade A",
            $state: "SC",
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
usersRoutes.get(
  "/:id",
  validateToken, // Se apenas administradores puderem acessar esse recurso
  UserController.getUserById /*
      #swagger.tags = ['Usuários']
      #swagger.description = 'Endpoint para buscar um usuário pelo ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: {
          type: 'integer'
        }
      }
      #swagger.responses[200] = {
        description: 'Usuário encontrado com sucesso'
      }
      #swagger.responses[404] = {
        description: 'Usuário não encontrado'
      }
    */
);

module.exports = usersRoutes;
