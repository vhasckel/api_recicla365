const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Material = connection.define("materials", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
});

module.exports = Material;
