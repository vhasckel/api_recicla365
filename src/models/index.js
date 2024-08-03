const Material = require("./Material");
const MaterialCollectionPoint = require("./MaterialCollectionPoint");
const RecyclingPoint = require("./RecyclingPoint");

//feito a associação muitos-para-muitos RecyclingPoint e Material usando a tabela de junção MaterialCollectionPoint
//um ponto de coleta pode ter muitos tipos de materiais e um material pode ser aceito em muitos pontos de coleta;
RecyclingPoint.belongsToMany(Material, {
  through: MaterialCollectionPoint,
  foreignKey: "collectPointId",
});
Material.belongsToMany(RecyclingPoint, {
  through: MaterialCollectionPoint,
  foreignKey: "materialId",
});

module.exports = {
  MaterialCollectionPoint,
  RecyclingPoint,
  Material,
};
