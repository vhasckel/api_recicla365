const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const loginRoutes = new Router();

loginRoutes.post(
  "/",
  LoginController.login
  /*
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para logar um usuário',
    #swagger.parameters['loginUsuario'] = {
        in: 'body',
        description: 'Login do usuário',
        required: true,
        schema: { 
            $email: "teste@gmail.com",
            $passwordHash: "teste123"
        }
    }
*/
);

module.exports = loginRoutes;
