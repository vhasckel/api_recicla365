const { Router } = require("express");
const usersRoutes = require("./users.routes");
const recyclingRoutes = require("./recyclingPoints.routes");
const permissionsRoutes = require("./permissions.routes");
const LoginController = require("../controllers/LoginController");
const validateToken = require("../middlewares/validationToken");

const routes = new Router();

routes.use("/usuarios", usersRoutes);
routes.use("/login", LoginController.login);
routes.use("/pontosDeColeta", validateToken, recyclingRoutes);
routes.use("/permissoes", validateToken, permissionsRoutes);

module.exports = routes;
