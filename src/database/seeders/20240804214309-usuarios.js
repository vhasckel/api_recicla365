"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("senha123", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Maria Silva",
          gender: "feminino",
          cpf: "12345678901",
          cep: "12345678",
          neighbourhood: "Centro",
          street: "Rua A",
          number: 100,
          email: "maria.silva@example.com",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "João Santos",
          gender: "masculino",
          cpf: "23456789012",
          cep: "23456789",
          neighbourhood: "Jardim",
          street: "Rua B",
          number: 200,
          email: "joao.santos@example.com",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ana Oliveira",
          gender: "feminino",
          cpf: "34567890123",
          cep: "34567890",
          neighbourhood: "Vila",
          street: "Rua C",
          number: 300,
          email: "ana.oliveira@example.com",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Carlos Pereira",
          gender: "masculino",
          cpf: "45678901234",
          cep: "45678901",
          neighbourhood: "Bairro",
          street: "Rua D",
          number: 400,
          email: "carlos.pereira@example.com",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juliana Costa",
          gender: "feminino",
          cpf: "56789012345",
          cep: "56789012",
          neighbourhood: "Zona Sul",
          street: "Rua E",
          number: 500,
          email: "juliana.costa@example.com",
          passwordHash: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
