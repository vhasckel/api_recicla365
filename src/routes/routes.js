const { Router } = require("express");
const usersRoutes = require("./users.routes");

const routes = new Router();

routes.use("/usuarios", usersRoutes);

module.exports = routes;
