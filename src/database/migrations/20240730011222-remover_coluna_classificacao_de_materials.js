"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("materials", "classification");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("materials", "classification", {
      allowNull: false,
      type: Sequelize.ENUM("reciclavel", "vidro", "oleo", "organico"),
    });
  },
};
