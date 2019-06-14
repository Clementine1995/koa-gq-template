// 引入模块
const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const KoaStatic = require('koa-static')
const Router = require('koa-router')
const koaBody = require('koa-body')

const database = require('./src/db') // 引入mongodb

const gqrouter = require('./src/router')

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};



database() // 链接数据库并且初始化数据模型

const app = new Koa()
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  playground: {
    endpoint: `/graphql`,
    settings: {
      "editor.theme": "light"
    }
  } 
});
server.applyMiddleware({ app });

const router = new Router();

// 使用 bodyParser 和 KoaStatic 中间件
app.use(koaBody());

app.use(KoaStatic(__dirname + '/public'));

router.use('', gqrouter.routes())

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
