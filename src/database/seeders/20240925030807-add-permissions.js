"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("permissions", [
      {
        description: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "adm",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions", {
      description: ["user", "adm"],
    });
  },
};
