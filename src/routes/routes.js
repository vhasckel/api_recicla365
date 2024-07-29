const { Router } = require("express");
const usersRoutes = require("./users.routes");
const LoginController = require("../controllers/LoginController");

const routes = new Router();

routes.use("/usuarios", usersRoutes);
routes.use("/login", LoginController.login);

module.exports = routes;
