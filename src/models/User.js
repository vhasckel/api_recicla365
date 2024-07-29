const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const User = connection.define("users", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("feminino", "nao-binario", "masculino", "outro"),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
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
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
