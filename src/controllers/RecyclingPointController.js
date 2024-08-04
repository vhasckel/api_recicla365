const {
  RecyclingPoint,
  Material,
  MaterialCollectionPoint,
} = require("../models");
const {
  createCollectPointSchema,
} = require("../middlewares/validationSchemas");
const { getMapData, getGoogleMapsLink } = require("../services/map.service");
const getCepData = require("../services/cep.service");
const {
  associateMaterials,
} = require("../services/associateMaterials.service");
const handleError = require("../services/handleErros.service");

class RecyclingPointController {
  async createCollectPoint(request, response) {
    try {
      const validatedData = await createCollectPointSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const { name, description, materials, cep } = validatedData;
      const locationData = await getMapData(cep);
      const googleMapsLink = await getGoogleMapsLink(locationData);
      const { logradouro: street, bairro: neighbourhood } = await getCepData(
        cep
      );
      const { lat: latitude, lon: longitude } = locationData;
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
        googleMapsLink,
      });

      await associateMaterials(recyclingPoint.id, materials);

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

      return response.status(201).json({
        recyclingPoint: pointWithMaterials,
      });
    } catch (error) {
      handleError(response, "Erro ao criar ponto de coleta", error);
    }
  }

  async getAllRecyclingPoints(request, response) {
    try {
      const points = await RecyclingPoint.findAll({
        attributes: ["id", "name"],
      });

      if (points.length === 0) {
        return response
          .status(404)
          .json({ message: "Não foi encontrado nenhum ponto de coleta" });
      }
      return response.status(200).json(points);
    } catch (error) {
      handleError(response, "Erro ao buscar pontos de coleta", error);
    }
  }

  async getMyRecyclingPoints(request, response) {
    try {
      const { userId } = request;

      const recyclingPoints = await RecyclingPoint.findAll({
        where: {
          userId,
        },
      });

      return response.status(200).json(recyclingPoints);
    } catch (error) {
      handleError(
        response,
        "Erro ao buscar os pontos de coleta do usuário.",
        error
      );
    }
  }

  async getOneRecyclingPoint(request, response) {
    try {
      const { id } = request.params;
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
        return response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      return response.status(200).json(point);
    } catch (error) {
      handleError(response, "Erro ao buscar ponto de coleta", error);
    }
  }

  async getLinkMap(request, response) {
    try {
      const { id } = request.params;

      const point = await RecyclingPoint.findByPk(id, {
        attributes: ["id", "name", "googleMapsLink"],
      });

      if (!point) {
        return response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      return response
        .status(200)
        .json({ googleMapsLink: point.googleMapsLink });
    } catch (error) {
      handleError(response, "Erro ao buscar link do Google Maps", error);
    }
  }

  async updateRecyclingPoint(request, response) {
    try {
      const { id } = request.params;
      const validatedData = await createCollectPointSchema.validate(
        request.body,
        { abortEarly: false }
      );

      const point = await RecyclingPoint.findByPk(id);

      if (!point) {
        return response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      if (point.userId !== request.userId) {
        return response.status(403).json({
          message: "Você não tem permissão para atualizar este ponto de coleta",
        });
      }

      Object.assign(point, validatedData);
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
      handleError(response, "Erro ao atulizar ponto de coleta", error);
    }
  }

  async deleteRecyclingPoint(request, response) {
    try {
      const { id } = request.params;
      const point = await RecyclingPoint.findByPk(id);

      if (!point) {
        return response
          .status(404)
          .json({ message: "Ponto de coleta não encontrado" });
      }

      if (point.userId !== request.userId) {
        return response.status(403).json({
          message: "Você não tem permissão para deletar este ponto de coleta",
        });
      }

      //como estamos lidando com tabelas associadas, essas associações precisam ser deletadas antes de deletar a tabela pai, para não gerar conflito
      await MaterialCollectionPoint.destroy({ where: { collectPointId: id } });

      await point.destroy();

      return response.status(204).send();
    } catch (error) {
      handleError(response, "Erro ao deletar ponto de coleta", error);
    }
  }
}

module.exports = new RecyclingPointController();
