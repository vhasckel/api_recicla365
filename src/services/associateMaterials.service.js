const { MaterialCollectionPoint } = require("../models");

//essa função cria a associação entre os pontos de coleta e os materiais
async function associateMaterials(collectPointId, materials) {
  const materialAssociations = materials.map((materialId) => ({
    collectPointId,
    materialId,
  }));
  //bulkCreate é um método do sequelize que permite introduzir vários registros de uma vez, é ele quem insere múltiplos registros na tabela de junção
  await MaterialCollectionPoint.bulkCreate(materialAssociations);
}

module.exports = { associateMaterials };
