"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "city", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.addColumn("users", "state", {
      type: Sequelize.STRING(2),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "city");
    await queryInterface.removeColumn("users", "state");
  },
};
