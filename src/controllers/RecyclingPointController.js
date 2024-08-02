const MaterialCollectionPoint = require("../models/MaterialCollectionPoint");
const RecyclingPoint = require("../models/RecyclingPoint");
const Material = require("../models/Material");
const {
  createCollectPointSchema,
} = require("../middlewares/validationSchemas");

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
      const validatedData = await createCollectPointSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const {
        name,
        description,
        cep,
        neighbourhood,
        street,
        longitude,
        latitude,
        materials,
      } = validatedData;

      const { userId } = request;

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

  async getAllRecyclingPoints(request, response) {
    try {
      const points = await RecyclingPoint.findAll({
        attributes: ["id", "name"],
      });

      if (points.length === 0) {
        response
          .status(404)
          .json({ message: "Não foi encontrado nenhum ponto de coleta" });
      }
      return response.status(200).json(points);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao buscar pontos de coleta",
        error: error.message,
      });
    }
  }

  async getOneRecyclingPoint(request, response) {
    try {
      const id = request.params.id;
      //se quiser que apareça os materiais junto com essa requisição, é preciso incluir o model de Material
      const point = await RecyclingPoint.findByPk(id, {
        include: [
          {
            model: Material,
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!point) {
        response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      return response.status(200).json(point);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao buscar ponto de coleta",
        error: error.message,
      });
    }
  }

  async updateRecyclingPoint(request, response) {
    try {
      const id = request.params.id;
      const validatedData = await createCollectPointSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const point = await RecyclingPoint.findByPk(id);

      if (!point) {
        response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }
      point.name = validatedData.name;
      point.description = validatedData.description;
      point.cep = validatedData.cep;
      point.neighbourhood = validatedData.neighbourhood;
      point.street = validatedData.street;
      point.longitude = validatedData.latitude;
      point.latitude = validatedData.latitude;
      point.materials = validatedData.materials;
      await point.save();

      //para poder atualizar os tipos de materiais, precisamos primeiro limpar os dados que estavam salvos
      if (Array.isArray(validatedData.materials)) {
        await MaterialCollectionPoint.destroy({
          where: { collectPointId: id },
        });

        const materialAssociations = validatedData.materials.map(
          (materialId) => ({
            collectPointId: id,
            materialId,
          })
        );
        //e novamente fazer essa inserão de dados com o bulkCreate
        await MaterialCollectionPoint.bulkCreate(materialAssociations);
      }

      const updatedPoint = await RecyclingPoint.findByPk(id, {
        include: [
          {
            model: Material,
            through: {
              attributes: [],
            },
          },
        ],
      });

      return response.status(200).json(updatedPoint);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao atualizar ponto de coleta",
        error: error.message,
      });
    }
  }

  async deleteRecyclingPoint(request, response) {
    try {
      const id = request.params.id;
      const point = await RecyclingPoint.findByPk(id);

      if (!point) {
        response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      //como estamos lidando com tabelas associadas, essas associações precisam ser deletadas antes de deletar a tabela pai, para não gerar conflito
      await MaterialCollectionPoint.destroy({ where: { collectPointId: id } });

      await point.destroy();

      return response.status(204).json();
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao deletar ponto de coleta",
        error: error.message,
      });
    }
  }
}

module.exports = new RecyclingPointController();
