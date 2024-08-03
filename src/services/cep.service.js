const axios = require("axios");
const linkCepApi = "https://viacep.com.br/ws/";

async function getCepData(cep) {
  try {
    const response = await axios.get(`${linkCepApi}${cep}/json/`);
    if (!response.data || response.data.length === 0) {
      throw new Error("Localização não encontrada");
    }

    const { logradouro, bairro } = response.data;

    return { logradouro, bairro };
  } catch (error) {
    console.error("Erro ao chamar a API de cep:", error.message);
    throw new Error("Erro ao chamar API de cep");
  }
}

module.exports = getCepData;
