const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const RecyclingPoints = connection.define("users", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  neighbourhood: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

module.exports = RecyclingPoints;
