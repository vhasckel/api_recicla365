const { Router } = require("express");
const UserController = require("../controllers/UserController");

const usersRoutes = new Router();

usersRoutes.post("/cadastrar", UserController.createAccount);

module.exports = usersRoutes;
