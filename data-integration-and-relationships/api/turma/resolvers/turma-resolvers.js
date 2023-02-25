const { GraphQLScalarType } = require("graphql");

const turmaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value).toISOString(),
  }),
  Query: {
    turmas: (_parent, _args, { dataSources }) => dataSources.turmasAPI.getTurmas(),
    turma: (_parent, { id }, { dataSources }) => dataSources.turmasAPI.getTurma(id),
  },
  Mutation: {
    createTurma: (_parent, { turma }, { dataSources }) => dataSources.turmasAPI.createTurma(turma),
    updateTurma: (_parent, { id, turma }, { dataSources }) =>
      dataSources.turmasAPI.updateTurma(id, turma),
    deleteTurma: (_parent, { id }, { dataSources }) => dataSources.turmasAPI.deleteTurma(id),
  },
  Turma: {
    matriculas: ({ id: turmaId }, _args, { dataSources }) =>
      dataSources.matriculasAPI.matriculasPorTurma(turmaId),
    docente: ({ docente_id: docenteId }, _args, { dataSources }) =>
      dataSources.usersAPI.getUserById(docenteId),
  },
};

module.exports = turmaResolvers;
