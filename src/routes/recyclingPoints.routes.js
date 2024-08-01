const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");
const verifyPermission = require("../middlewares/verifyPermission");
const validateToken = require("../middlewares/validationToken");

const recyclingRoutes = new Router();

recyclingRoutes.post(
  "/cadastrar",
  validateToken,
  verifyPermission(["criar ponto"]),
  RecyclingPointController.createCollectPoint
);

module.exports = recyclingRoutes;
