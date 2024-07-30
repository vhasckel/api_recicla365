"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "materials",
      [
        {
          name: "reciclavel",
          description: "Descrição para reciclável",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "vidro",
          description: "Descrição para vidro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "oleo",
          description: "Descrição para óleo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "organico",
          description: "Descrição para orgânico",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("materials", {
      name: ["reciclavel", "vidro", "oleo", "organico"],
    });
  },
};
