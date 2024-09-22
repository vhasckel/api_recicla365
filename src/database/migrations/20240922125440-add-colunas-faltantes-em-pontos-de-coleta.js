"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("recycling_points", "city", {
      type: Sequelize.STRING(50),
      allowNull: false,
    });

    await queryInterface.addColumn("recycling_points", "state", {
      type: Sequelize.STRING(2),
      allowNull: false,
    });

    await queryInterface.addColumn("recycling_points", "number", {
      type: Sequelize.STRING(10),
      allowNull: false,
    });

    await queryInterface.addColumn("recycling_points", "complemento", {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("recycling_points", "city");
    await queryInterface.removeColumn("recycling_points", "state");
    await queryInterface.removeColumn("recycling_points", "number");
    await queryInterface.removeColumn("recycling_points", "complemento");
  },
};