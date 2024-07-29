const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateData = require("../middlewares/validateData");

const usersRoutes = new Router();

usersRoutes.post("/cadastrar", validateData, UserController.createAccount);

module.exports = usersRoutes;
