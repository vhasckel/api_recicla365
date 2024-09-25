"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin",
          gender: "outro",
          cpf: "00000000000",
          cep: "00000000",
          city: "Admin City",
          state: "XX",
          neighbourhood: "Admin Neighbourhood",
          street: "Admin Street",
          number: 1,
          birthdate: "2000-01-01",
          email: "admin@email.com",
          permission: "adm",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", { email: "admin@email.com" });
  },
};
