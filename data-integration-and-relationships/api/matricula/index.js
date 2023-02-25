const matriculaSchema = require("./schema/matricula.graphql");
const matriculaResolvers = require("./resolvers/matricula-resolvers");
const MatriculasAPI = require("./datasource/matricula");

module.exports = {
  matriculaSchema,
  matriculaResolvers,
  MatriculasAPI,
};
