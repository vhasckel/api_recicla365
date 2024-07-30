const { Router } = require("express");
const usersRoutes = require("./users.routes");
const LoginController = require("../controllers/LoginController");
const recyclingRoutes = require("./recyclingPoints.routes");

const routes = new Router();

routes.use("/usuarios", usersRoutes);
routes.use("/login", LoginController.login);
routes.use("/pontosDeColeta", recyclingRoutes);

module.exports = routes;
