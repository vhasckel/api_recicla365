const { Router } = require("express");
const usersRoutes = require("./users.routes");
const recyclingRoutes = require("./recyclingPoints.routes");
const validateToken = require("../middlewares/validationToken");

const routes = new Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc.swagger.json");
const loginRoutes = require("./login.routes");
const permissionsRoutes = require("./permissions.routes");

routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use("/usuarios", usersRoutes);
routes.use("/login", loginRoutes);

routes.use("/pontosDeColeta", validateToken, recyclingRoutes);
routes.use("/permissoes", validateToken, permissionsRoutes);

module.exports = routes;
