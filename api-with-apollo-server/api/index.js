const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("graphql-tools");
const userSchema = require("./user/schema/user.graphql");
const useResolvers = require("./user/resolvers/user-resolvers");
const UsersAPI = require("./user/datasource/user");

const typeDefs = mergeTypeDefs([userSchema]);
const resolvers = [useResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor rodando em ${url}`);
});
