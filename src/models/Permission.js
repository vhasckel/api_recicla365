const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Permission = connection.define("permissions", {
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Permission;
