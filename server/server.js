import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {schema} from "./schema";
import {resolvers} from './resolvers';
import http from "http";

const PORT = 4000;
const app = express();
const server = new ApolloServer({ schema, resolvers });

server.applyMiddleware({app});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});

//
//
// const server = express();
//
// server.use('*', cors({ origin: 'http://localhost:3000'}));
//
// server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema}));
// server.use('/graphiql', bodyParser.json(), graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
// }));
//
// const ws = createServer(server);
//
// ws.listen(PORT, () => {
//   console.log(`Your GraphQL server is running on port ${PORT}`);
//
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     schema
//   }, {
//     server: ws,
//     path: '/subscriptions'
//   })
// });
