const { Router } = require("express");
const usersRoutes = require("./users.routes");
const recyclingRoutes = require("./recyclingPoints.routes");
const validateToken = require("../middlewares/validationToken");

const routes = new Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc.swagger.json");
const loginRoutes = require("./login.routes");
const permissionsRoutes = require("./permissions.routes");
const verifyPermission = require("../middlewares/verifyPermission");

routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use("/users", usersRoutes);
routes.use("/login", loginRoutes);

routes.use("/collection-points", recyclingRoutes);
routes.use(
  "/permissions",
  validateToken,
  verifyPermission(["adm"]),
  permissionsRoutes
);

module.exports = routes;
