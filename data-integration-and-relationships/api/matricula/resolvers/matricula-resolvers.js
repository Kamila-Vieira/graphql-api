const { GraphQLScalarType } = require("graphql");

const matriculaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value).toISOString(),
  }),

  Mutation: {
    matricularEstudante: (_parent, ids, { dataSources }) =>
      dataSources.matriculasAPI.matricularEstudante(ids),
    deleteMatricula: (_, { matriculaId }, { dataSources }) =>
      dataSources.matriculasAPI.deleteMatricula(matriculaId),
    cancelMatricula: (_, { matriculaId }, { dataSources }) =>
      dataSources.matriculasAPI.cancelMatricula(matriculaId),
  },

  Matricula: {
    estudante: ({ estudante_id: estudanteId }, _, { dataSources }) =>
      dataSources.usersAPI.getUserById(estudanteId),
    turma: ({ turma_id: turmaId }, _, { dataSources }) =>
      dataSources.turmasAPI.getTurmaById(turmaId),
  },
};

module.exports = matriculaResolvers;
