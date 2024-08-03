const { Router } = require("express");
const PermissionController = require("../controllers/PermissionController");
const verifyPermission = require("../middlewares/verifyPermission");
const validateToken = require("../middlewares/validationToken");

const permissionsRoutes = new Router();

permissionsRoutes.post(
  "/",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.createPermission
);
permissionsRoutes.get(
  "/",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.getAllPermissions
);
permissionsRoutes.delete(
  "/:id",
  validateToken,
  verifyPermission(["adm"]),
  PermissionController.deletePermission
);

permissionsRoutes.post(
  "/atribuir",
  validateToken,
  PermissionController.assignPermission
);

module.exports = permissionsRoutes;
