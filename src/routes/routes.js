const { Router } = require("express");
const usersRoutes = require("./users.routes");
const LoginController = require("../controllers/LoginController");
const recyclingRoutes = require("./recyclingPoints.routes");
const validateToken = require("../middlewares/validationToken");
const permissionsRoutes = require("./permissions.routes");
const verifyPermission = require("../middlewares/verifyPermission");

const routes = new Router();

routes.use("/usuarios", usersRoutes);
routes.use("/login", LoginController.login);
routes.use("/pontosDeColeta", recyclingRoutes);
routes.use("/permissoes", validateToken, permissionsRoutes);

module.exports = routes;
