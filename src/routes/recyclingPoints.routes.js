const { Router } = require("express");
const RecyclingPointController = require("../controllers/RecyclingPointController");
const validateToken = require("../middlewares/validationToken");
const recyclingRoutes = new Router();

recyclingRoutes.post(
  "/cadastrar",
  RecyclingPointController.createCollectPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para criar ponto de coleta'
    #swagger.parameters['createCollectPoint'] = {
        in: 'body',
        description: 'Dados para pontos de coleta',
        required: true,
        schema: {
            $name: "Ponto de Coleta A",
            $description: "Descrição do ponto de coleta",
            $cep: 88036280,
            $neighbourhood: "trindade",
            $street: "prof. enoe schutel",
            $longitude: 48.222,
            $latitude: 27.564,
            $userId: 11,
            $materials: [1, 2, 3],
        }
    }
    #swagger.responses[201] = {
        description: 'Ponto de coleta criado com sucesso'
    }
    #swagger.responses[400] = {
        description: 'Erro de validação'
    }
  */
);
recyclingRoutes.get(
  "/",
  RecyclingPointController.getAllRecyclingPoints
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para buscar todos os pontos de coleta'
    #swagger.responses[200] = {
        description: 'Lista de pontos de coleta'
    }
    #swagger.responses[404] = {
        description: 'Nenhum ponto de coleta encontrado'
    }
  */
);
recyclingRoutes.get(
  "/local",
  validateToken,
  RecyclingPointController.getMyRecyclingPoints
  /*
  #swagger.tags = ['Pontos de Coleta']
  #swagger.description = 'Endpoint para buscar todos os pontos de um usuário logado'
  #swagger.responses[200] = {
      description: 'Lista de pontos de coleta do usuário'
  }
  #swagger.responses[404] = {
      description: 'Nenhum ponto de coleta encontrado'
  }
*/
);
recyclingRoutes.get(
  "/detalhes/:id",
  validateToken,
  RecyclingPointController.getOneRecyclingPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para buscar por id um ponto de coleta específico'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.responses[200] = {
        description: 'Detalhes do ponto de coleta'
    }
    #swagger.responses[404] = {
        description: 'Ponto de coleta não encontrado'
    }
  */
);
recyclingRoutes.put(
  "/local/:id",
  validateToken,
  RecyclingPointController.updateRecyclingPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para atualizar um ponto de coleta por ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.parameters['updateRecyclingPoint'] = {
        in: 'body',
        description: 'Dados atualizados para o ponto de coleta',
        required: true,
        schema: { 
            $name: "Ponto de Coleta A",
            $description: "Descrição do ponto de coleta",
            $cep: 88036280,
            $neighbourhood: "trindade",
            $street: "prof. enoe schutel",
            $longitude: 48.222,
            $latitude: 27.564,
            $userId: 11,
            $materials: [1, 2, 3],
        }
    }
    #swagger.responses[200] = {
        description: 'Ponto de coleta atualizado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Ponto de coleta não encontrado'
    }
    #swagger.responses[403] = {
        description: 'Usuário não tem permissão para atualizar este ponto de coleta'
    }
  */
);
recyclingRoutes.delete(
  "/local/:id",
  validateToken,
  RecyclingPointController.deleteRecyclingPoint
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para deletar ponto de coleta por ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.responses[204] = {
        description: 'Ponto de coleta deletado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Ponto de coleta não encontrado'
    }
    #swagger.responses[403] = {
        description: 'Usuário não tem permissão para deletar este ponto de coleta'
    }
  */
);

recyclingRoutes.get(
  "/local/:id/maps",
  RecyclingPointController.getLinkMap
  /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para buscar o link do Google Maps através do ID de um ponto de coleta'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do ponto de coleta',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.responses[200] = {
        description: 'Link do Google Maps para o ponto de coleta'
    }
    #swagger.responses[404] = {
        description: 'Ponto de coleta não encontrado'
    }
  */
);

module.exports = recyclingRoutes;
