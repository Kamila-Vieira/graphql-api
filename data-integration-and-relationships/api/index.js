const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("graphql-tools");
const path = require("path");

const userSchema = require("./user/schema/user.graphql");
const turmaSchema = require("./turma/schema/turma.graphql");

const userResolvers = require("./user/resolvers/user-resolvers");
const turmaResolvers = require("./turma/resolvers/turma-resolvers");

const UsersAPI = require("./user/datasource/user");
const TurmasAPI = require("./turma/datasource/turma");

const typeDefs = mergeTypeDefs([userSchema, turmaSchema]);
const resolvers = [userResolvers, turmaResolvers];

const dbConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "./data/database.db"),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
      turmasAPI: new TurmasAPI(dbConfig),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor rodando em ${url}`);
});
