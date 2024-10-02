const {
  RecyclingPoint,
  Material,
  MaterialCollectionPoint,
} = require("../models");
const UserPermission = require("../models/UserPermission");
const {
  createCollectPointSchema,
} = require("../middlewares/validationSchemas");
const { getMapData, getGoogleMapsLink } = require("../services/map.service");
const getCepData = require("../services/cep.service");
const {
  associateMaterials,
} = require("../services/associateMaterials.service");
const handleError = require("../services/handleErros.service");
const { Op } = require("sequelize");
const Permission = require("../models/Permission");

class RecyclingPointController {
  async createCollectPoint(request, response) {
    try {
      const validatedData = await createCollectPointSchema.validate(
        request.body,
        { abortEarly: false }
      );
  
      const { userId, name, description, materials, cep, neighbourhood, street, number, complemento, state, city } = validatedData;
  
      let latitude = validatedData.latitude;
      let longitude = validatedData.longitude;
  
      if (!latitude || !longitude) {
        try {
          const locationData = await getMapData(cep);

          latitude = parseFloat(locationData.lat);
          longitude = parseFloat(locationData.lon);
        } catch (error) {
          console.error("Erro ao buscar localização:", error.message);
          return response.status(500).json({ message: "Erro ao buscar localização." });
        }
      }
  
      if (!latitude || !longitude) {
        return response.status(400).json({ message: "Latitude e Longitude não podem ser vazias." });
      }

      const googleMapsLink = await getGoogleMapsLink({ lat: latitude, lon: longitude });

      // verificação se materials é um array
      if (!Array.isArray(materials)) {
        return response.status(400).json({ message: "Materials precisa ser um Array de IDs" });
      }

      // verificação se o array não está vazio
      if (materials.length === 0) {
        return response.status(400).json({
          message: "O array de materials não pode estar vazio",
        });
      }

      // busca os materiais pelo array de IDs
      const existingMaterials = await Material.findAll({
        where: {
          id: {
            [Op.in]: materials,
          },
        },
        attributes: ["id"],
      });

      // extrai os IDs dos materiais encontrados
      const existingMaterialIds = existingMaterials.map((material) => material.id);

      // verifica se todos os IDs enviados estão presentes na tabela materials
      const missingMaterials = materials.filter(
        (materialId) => !existingMaterialIds.includes(materialId)
      );

      if (missingMaterials.length > 0) {
        return response.status(400).json({
          message: `Os seguintes IDs de materials são inválidos: ${missingMaterials.join(", ")}`,
        });
      }

      const recyclingPoint = await RecyclingPoint.create({
        name,
        description,
        cep,
        neighbourhood,
        street,
        number,
        complemento,
        state,
        city,
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
            include: [
                {
                    model: Material,
                    as: 'materials',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ],
            attributes: [
                "id",
                "name",
                "latitude",
                "longitude",
                "description",
                "street",
                "number",
                "complemento",
                "neighbourhood",
                "city",
                "state",
                "cep",
                "googleMapsLink",
            ],
        });

        if (points.length === 0) {
            return response.status(404).json({ message: "Não foi encontrado nenhum ponto de coleta" });
        }

        // Formatar os pontos de coleta para incluir os tipos de materiais
        const formattedPoints = points.map(ponto => ({
            ...ponto.toJSON(),
            materials: ponto.materials.map(material => material.name)
        }));

        return response.status(200).json(formattedPoints);
    } catch (error) {
        handleError(response, "Erro ao buscar pontos de coleta", error);
    }
}

async getMyRecyclingPoints(request, response) {
  try {
      const { userId } = request;

      const recyclingPoints = await RecyclingPoint.findAll({
          where: { userId },
          include: [
              {
                  model: Material,
                  as: 'materials',
                  attributes: ['id', 'name'],
                  through: { attributes: [] },
              }
          ],
          attributes: [
              "id",
              "name",
              "description",
              "street",
              "neighbourhood",
              "city",
              "state",
              "number",
              "complemento",
              "cep",
              "latitude",
              "longitude",
              "googleMapsLink",
          ],
      });

      if (recyclingPoints.length === 0) {
          return response.status(404).json({ message: "Não foi encontrado nenhum ponto de coleta" });
      }

      const formattedPoints = recyclingPoints.map(ponto => ({
          ...ponto.toJSON(),
          materials: ponto.materials.map(material => material.name)
      }));

      return response.status(200).json(formattedPoints);
  } catch (error) {
      console.error(error);
      handleError(response, "Erro ao buscar os pontos de coleta do usuário.", error);
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
                  as: 'materials',
                  attributes: ['id', 'name'],
                  through: {
                      attributes: [],
                  },
              },
          ],
          attributes: [
              "id",
              "name",
              "description",
              "street",
              "neighbourhood",
              "city",
              "state",
              "number",
              "complemento",
              "cep",
              "latitude",
              "longitude",
              "googleMapsLink",
          ],
      });

      if (!point) {
          return response
              .status(404)
              .json({ message: "Ponto de coleta não encontrado" });
      }

      const formattedPoint = {
        ...point.toJSON(),
        materials: point.materials.map(material => ({
            value: material.id,
            label: material.name
        }))
    };

      return response.status(200).json(formattedPoint);
  } catch (error) {
      console.error(error);
      handleError(response, "Erro ao buscar ponto de coleta", error);
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

      const permissionId = await UserPermission.findByPk(request.userId);

      const permission = await Permission.findByPk(permissionId.dataValues.permissionId);

      if (point.userId !== request.userId && permission.dataValues.description !== 'admin') {
          return response.status(403).json({
              message: "Você não tem permissão para atualizar este ponto de coleta",
          });
      }

      const { userId, name, description, materials, cep, neighbourhood, street, number, complemento, state, city } = validatedData;

      let latitude = validatedData.latitude;
      let longitude = validatedData.longitude;

      if (!latitude || !longitude) {
          try {
              const locationData = await getMapData(cep);
              latitude = parseFloat(locationData.lat);
              longitude = parseFloat(locationData.lon);
          } catch (error) {
              console.error("Erro ao buscar localização:", error.message);
              return response.status(500).json({ message: "Erro ao buscar localização." });
          }
      }

      const googleMapsLink = await getGoogleMapsLink({ lat: latitude, lon: longitude });

      // atualiza o ponto de coleta com os dados validados
      Object.assign(point, {
          userId,
          name,
          description,
          cep,
          neighbourhood,
          street,
          number,
          complemento,
          state,
          city,
          latitude,
          longitude,
          googleMapsLink
      });

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
      handleError(response, "Erro ao atualizar ponto de coleta", error);
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

      const permissionId = await UserPermission.findByPk(request.userId);

      const permission = await Permission.findByPk(permissionId.dataValues.permissionId);

      if (point.userId !== request.userId && permission.dataValues.description !== 'admin') {
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
