const { Router } = require("express");
const PermissionController = require("../controllers/PermissionController");

const permissionsRoutes = new Router();

permissionsRoutes.post("/", PermissionController.createPermission);
permissionsRoutes.get("/", PermissionController.getAllPermissions);
permissionsRoutes.delete("/:id", PermissionController.deletePermission);

permissionsRoutes.post("/atribuir", PermissionController.assignPermission);

module.exports = permissionsRoutes;
