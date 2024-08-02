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
  "/:id",
  validateToken,
  RecyclingPointController.getOneRecyclingPoint
);
recyclingRoutes.put(
  "/:id",
  validateToken,
  RecyclingPointController.updateRecyclingPoint
);
recyclingRoutes.delete(
  "/:id",
  validateToken,
  RecyclingPointController.deleteRecyclingPoint
);

module.exports = recyclingRoutes;
