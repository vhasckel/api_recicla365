const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");
const verifyPermission = require("../middlewares/verifyPermission");
const validateToken = require("../middlewares/validationToken");

const recyclingRoutes = new Router();

recyclingRoutes.post("/cadastrar", RecyclingPointController.createCollectPoint);
recyclingRoutes.get("/", RecyclingPointController.getAllRecyclingPoints);
recyclingRoutes.get("/:id", RecyclingPointController.getOneRecyclingPoint);
recyclingRoutes.put("/:id", RecyclingPointController.updateRecyclingPoint);
recyclingRoutes.delete("/:id", RecyclingPointController.deleteRecyclingPoint);

module.exports = recyclingRoutes;
