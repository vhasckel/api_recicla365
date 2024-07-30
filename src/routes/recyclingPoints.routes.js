const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");

const recyclingRoutes = new Router();

recyclingRoutes.post("/cadastrar", RecyclingPointController.createCollectPoint);

module.exports = recyclingRoutes;
