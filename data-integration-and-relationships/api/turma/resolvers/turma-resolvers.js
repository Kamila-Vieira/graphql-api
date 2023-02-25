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
    turmas: (_root, _args, { dataSources }) => dataSources.turmasAPI.getTurmas(),
    turma: (_root, { id }, { dataSources }) => dataSources.turmasAPI.getTurma(id),
  },
  Mutation: {
    createTurma: (_, { turma }, { dataSources }) => dataSources.turmasAPI.createTurma(turma),
    updateTurma: (_, { id, turma }, { dataSources }) =>
      dataSources.turmasAPI.updateTurma(id, turma),
    deleteTurma: (_, { id }, { dataSources }) => dataSources.turmasAPI.deleteTurma(id),
  },
};

module.exports = turmaResolvers;
