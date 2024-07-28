const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API recicla365",
    description: "Documentação da API recicla365 usando Express e Sequelize",
    version: "1.0.0",
  },
  host: "localhost:3000",
  security: [{ apiKeyAuth: [] }],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Insira o token JWT",
    },
  },
};

const outputFile = "./src/routes/doc.swagger.json";
const routes = ["./src/routes/routes.js"];

swaggerAutogen(outputFile, routes, doc);
