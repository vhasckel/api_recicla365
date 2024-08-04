const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");

const recyclingRoutes = new Router();

recyclingRoutes.post("/cadastrar", RecyclingPointController.createCollectPoint);
recyclingRoutes.get("/", RecyclingPointController.getAllRecyclingPoints);
recyclingRoutes.get("/local", RecyclingPointController.getMyRecyclingPoints);

recyclingRoutes.get(
  "/detalhes/:id",
  RecyclingPointController.getOneRecyclingPoint
);
recyclingRoutes.put(
  "/local/:id",
  RecyclingPointController.updateRecyclingPoint
);
recyclingRoutes.delete(
  "/local/:id",
  RecyclingPointController.deleteRecyclingPoint
);

recyclingRoutes.get("/local/:id/maps", RecyclingPointController.getLinkMap);

module.exports = recyclingRoutes;
