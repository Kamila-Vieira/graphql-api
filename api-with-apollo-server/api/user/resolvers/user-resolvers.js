const useResolvers = {
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
    createUser: async (_root, user, { dataSources }, _info) =>
      dataSources.usersAPI.createUser(user),
    updateUser: async (_root, data, { dataSources }, _info) =>
      dataSources.usersAPI.updateUser(data),
    deleteUser: async (_root, { id }, { dataSources }, _info) =>
      dataSources.usersAPI.deleteUser(id),
  },
};

module.exports = useResolvers;
