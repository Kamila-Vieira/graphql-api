### Links úteis

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Criação de Datasources](https://www.apollographql.com/tutorials/fullstack-quickstart/03-connecting-to-data-sources#building-a-custom-data-source)
- [Artigo sobre Datasources](https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/)
- [SQLDataSource](https://www.npmjs.com/package/datasource-sql)
- [Knexjs](https://knexjs.org/guide/query-builder.html)

### Outras alternativas

- [Faunadb](https://fauna.com/): Plataforma de database que oferece soluções para aplicações serverless, utilizando o GraphQL como linguagem de query.
- [Express](https://expressjs.com/): Bastante utilizado em APIs REST com NodeJS, o Express também pode ser utilizado com GraphQL. A página inicial do GraphQL tem este tutorial (em inglês) que utiliza as libs express e express-graphql para subir um servidor.
- [graphql-yoga](https://github.com/dotansimha/graphql-yoga): Servidor GraphQL focado em performance e com um setup parecido com o do Apollo. É baseado em parte nas libs do Apollo, Express e GraphQL Tools.
- [Prisma](https://www.prisma.io/): Ferramenta para interface com bases de dados (MySQL, SQLite ou Postgres) e que pode ser utilizada tanto para construir APIs em GraphQL quanto REST.

### Apelidando operações

```gql
  query UsersByRoles($page: Int, $limit: Int) {
    estudantes: usersByRole(roleId: 1, page: $page, limit: $limit) {
      id
      nome
      createdAt
      role {
        id
        type
      }
    }
    docentes: usersByRole(roleId: 2, page: $page, limit: $limit) {
      id
      nome
      createdAt
      role {
        id
        type
      }
    }
    coodenadores: usersByRole(roleId: 3, page: $page, limit: $limit) {
      id
      nome
      createdAt
      role {
        id
        type
      }
    }
  }
```