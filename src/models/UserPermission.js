const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const UserPermission = connection.define("user_permissions", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "permissions",
      key: "id",
    },
  },
});

module.exports = UserPermission;
