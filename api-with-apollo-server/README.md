### Links úteis

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

### Introspecção ou *introspection*

Visualização de todos os tipos e queries presentes na aplicação

```gql
{
    __type(name: "User") { # Filtra pelo type especificado
        name
    }
    __schema { # Retorna todos os schemas da aplicação
      types {
          name
          description
          kind
          fields {
              name
          }
      }
      queryType { # ponto de entrada da API:
            name
            description
        }
    }
    
}
```

**Obs.:** O playground e a introspecção não ficam disponíveis na versão em produção da API, caso seja necessário disponibilizar, é possível declarar isso explicitamente na instância de ApolloServer:

```js
const server = new ApolloServer({
    ...
    introspection: true,  
    playground: true,
});
```

### Módulos de conexão com dados ou *DataSources*

Existem diversos módulos para uso de dados no mercado para cada tipo de necessidade, inclusive para conexão direta com o banco de dados, por exemplo, para MongoDB: [Mongo DataSource](https://github.com/GraphQLGuide/apollo-datasource-mongodb/).

Existem soluções também para abstração de conexão com o banco de dados como: [AWS AppSync](https://aws.amazon.com/pt/appsync/) para DynamoDB, Elasticsearch e Aurora;
[Stitch](https://www.mongodb.com/docs/atlas/app-services/graphql/) para MongoDB.