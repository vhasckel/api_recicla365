const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");
const validateToken = require("../middlewares/validationToken");

const recyclingRoutes = new Router();

recyclingRoutes.post(
  "/cadastrar",
  validateToken,
  RecyclingPointController.createCollectPoint
);
recyclingRoutes.get(
  "/",
  validateToken,
  RecyclingPointController.getAllRecyclingPoints
);
recyclingRoutes.get(
  "/local",
  validateToken,
  RecyclingPointController.getMyRecyclingPoints
);

recyclingRoutes.get(
  "/detalhes/:id",
  validateToken,
  RecyclingPointController.getOneRecyclingPoint
);
recyclingRoutes.put(
  "/local/:id",
  validateToken,
  RecyclingPointController.updateRecyclingPoint
);
recyclingRoutes.delete(
  "/local/:id",
  validateToken,
  RecyclingPointController.deleteRecyclingPoint
);

module.exports = recyclingRoutes;
