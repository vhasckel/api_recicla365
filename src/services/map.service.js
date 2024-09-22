const axios = require("axios");

const linkMapApi =
  "https://nominatim.openstreetmap.org/search.php";

  async function getMapData(cep) {
    try {
      const response = await axios.get(`${linkMapApi}?q=${cep}&countrycodes=br&format=jsonv2`, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });
  
      if (!response.data || response.data.length === 0) {
        throw new Error("Localização não encontrada");
      }
  
      const { lat, lon, display_name } = response.data[0];
  
      if (!lat || !lon || !display_name) {
        throw new Error("Localização não foi encontrada com esses dados");
      }
  
      return { lat, lon, display_name };
    } catch (error) {
      console.error("Erro ao chamar a API de mapas:", error.message);
      throw new Error("Erro ao chamar API de mapas");
    }
  }  

async function getGoogleMapsLink(local) {
  try {
    const { lat, lon } = local;
    if (!lat || !lon) {
      throw new Error("dados de localização inválidos");
    }

    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

    return googleMapsLink;
  } catch (error) {
    console.error("Erro ao gerar o link do Google Maps:", error.message);
    throw new Error("Erro ao gerar link do Google Maps");
  }
}

module.exports = {
  getMapData,
  getGoogleMapsLink,
};
