"use strict";
const bcrypt = require("bcryptjs");
const Permission = require("../../models/Permission");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const users = await queryInterface.bulkInsert(
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
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    // obter o ID da permissão "adm"
    const adminPermission = await Permission.findOne({
      where: { description: "adm" },
    });

    if (adminPermission) {
      // associar o usuário Admin à permissão "adm"
      await queryInterface.bulkInsert("user_permissions", [
        {
          userId: users[0].id,
          permissionId: adminPermission.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.error("Permissão 'adm' não encontrada.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_permissions", { userId: 1 });
    return queryInterface.bulkDelete("users", { email: "admin@email.com" });
  },
};
