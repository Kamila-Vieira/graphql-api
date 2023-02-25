const { GraphQLScalarType } = require("graphql");

const userResolvers = {
  CustomResponse: {
    __resolveType(_object, _context, _info) {
      return false;
    },
  },

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => new Date(value).toISOString(), // Pega o dado da base de dados para a conversão
    parseValue: (value) => new Date(value), // Pega o dado do input de variáveis para a conversão
    parseLiteral: (ast) => new Date(ast.value).toISOString(), // Pega o dado do input de argumentos inline na query para a conversão
  }),

  Query: {
    /**
     * _root: Resultado da consulta anterior
     * _args: Argumentos passados para as resolução da consulta
     * context: Traz o contexto para ser trabalhado na query. Ex.: dados externos, dados relativos a autenticação de usuário, permissões, etc
     * _info: Representação em árvore da query. Traz tudo que o resolver precisa para saber o que tem que retornar
     * **/
    users: (_root, _args, context, _info) => context.dataSources.usersAPI.getUsers(),
    user: (_root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
    usersByRole: (_root, { roleId }, { dataSources }) =>
      dataSources.usersAPI.getUsersByRole(roleId),
    activeUsers: (_root, _args, { dataSources }) => dataSources.usersAPI.getActiveUsers(),
  },

  Mutation: {
    createUser: async (_root, { input, createdAt }, { dataSources }, _info) =>
      dataSources.usersAPI.createUser({ ...input, createdAt }),
    updateUser: async (_root, { id, input }, { dataSources }, _info) =>
      dataSources.usersAPI.updateUser({ ...input, id }),
    deleteUser: async (_root, { id }, { dataSources }, _info) =>
      dataSources.usersAPI.deleteUser(id),
  },

  User: {
    matriculas: ({ id: estudanteId }, _args, { dataSources }) =>
      dataSources.matriculasAPI.matriculasPorEstudante.load(estudanteId),
    role: ({ role: roleId }, _args, { dataSources }) => dataSources.usersAPI.getUserRole(roleId),
  },
};

module.exports = userResolvers;
