const MaterialCollectionPoint = require("../models/MaterialCollectionPoint");
const RecyclingPoint = require("../models/RecyclingPoint");
const Material = require("../models/Material");

//feito a associação muitos-para-muitos RecyclingPoint e Material usando a tabela de junção MaterialCollectionPoint
// - um ponto de coleta pode ter muitos tipos de materiais e um material pode ser aceito em muitos pontos de coleta;
RecyclingPoint.belongsToMany(Material, {
  through: MaterialCollectionPoint,
  foreignKey: "collectPointId",
});
Material.belongsToMany(RecyclingPoint, {
  through: MaterialCollectionPoint,
  foreignKey: "materialId",
});

class RecyclingPointController {
  async createCollectPoint(request, response) {
    try {
      const {
        name,
        description,
        cep,
        neighbourhood,
        street,
        longitude,
        latitude,
        userId,
        materials,
      } = request.body;

      if (!Array.isArray(materials)) {
        return response
          .status(400)
          .json({ message: "Materials precisa ser um Array de IDs" });
      }

      const recyclingPoint = await RecyclingPoint.create({
        name,
        description,
        cep,
        neighbourhood,
        street,
        longitude,
        latitude,
        userId,
      });

      //essa função cria a associação entre os pontos de coleta e os materiais
      const materialAssociations = materials.map((materialId) => ({
        collectPointId: recyclingPoint.id,
        materialId,
      }));

      //bulkCreate é um método do sequelize que permite introduzir vários registros de uma vez, é ele quem insere múltiplos registros na tabela de junção
      await MaterialCollectionPoint.bulkCreate(materialAssociations);

      //recupera o ponto de coleta com todos os materiais associados. 'attributes: []' exclui outros detalhes da tabela de junção
      const pointWithMaterials = await RecyclingPoint.findByPk(
        recyclingPoint.id,
        {
          include: [
            {
              model: Material,
              through: {
                attributes: [],
              },
            },
          ],
        }
      );

      return response.status(201).json(pointWithMaterials);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao criar ponto de coleta",
        error: error.message,
      });
    }
  }
}

module.exports = new RecyclingPointController();
