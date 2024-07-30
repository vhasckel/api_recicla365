const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const MaterialCollectionPoint = connection.define(
  "material_collection_points",
  {
    collectPointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recycling_points",
        key: "id",
      },
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "materials",
        key: "id",
      },
    },
  }
);

module.exports = MaterialCollectionPoint;
