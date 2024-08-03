const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateToken = require("../middlewares/validationToken");

const usersRoutes = new Router();

usersRoutes.post("/cadastrar", UserController.createAccount);
usersRoutes.delete("/deletar/:id", validateToken, UserController.deleteAccount);
usersRoutes.put("/atualizar/:id", validateToken, UserController.updateAccount);

module.exports = usersRoutes;
