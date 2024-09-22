"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "materials",
      [
        {
          name: "Vidro",
          description: "Descrição para vidro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Madeira",
          description: "Descrição para madeira",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Papel",
          description: "Descrição para papel e papelão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alumínio",
          description: "Descrição para alumínio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Óleo",
          description: "Descrição para óleo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pilhas",
          description: "Descrição para pilhas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lâmpadas",
          description: "Descrição para lâmpadas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eletrônicos",
          description: "Descrição para eletrônicos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lixo hospitalar",
          description: "Descrição para lixo hospitalar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Material não reciclável",
          description: "Descrição para material não reciclável",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Material de construção",
          description: "Descrição para material de construção",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("materials", {
      name: [
        "Vidro",
        "Madeira",
        "Papel",
        "Alumínio",
        "Óleo",
        "Pilhas",
        "Lâmpadas",
        "Eletrônicos",
        "Lixo hospitalar",
        "Material não reciclável",
        "Material de construção"
      ],
    });
  },
};