const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateRegister = require("../middlewares/validateRegister");

const usersRoutes = new Router();

usersRoutes.post("/cadastrar", validateRegister, UserController.createAccount);

module.exports = usersRoutes;
