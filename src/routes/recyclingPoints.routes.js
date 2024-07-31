const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");

const recyclingRoutes = new Router();

recyclingRoutes.post("/cadastrar", RecyclingPointController.createCollectPoint);
recyclingRoutes.get("/", RecyclingPointController.getAllRecyclingPoints);
recyclingRoutes.get("/:id", RecyclingPointController.getOneRecyclingPoint);
recyclingRoutes.put("/:id", RecyclingPointController.updateRecyclingPoint);
recyclingRoutes.delete("/:id", RecyclingPointController.deleteRecyclingPoint);

module.exports = recyclingRoutes;
