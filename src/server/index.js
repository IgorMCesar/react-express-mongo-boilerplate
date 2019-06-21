// #1 Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// #2 Import mongoose
// TODO Async-Await
require('./config/database');

// #3 Import GraphQL type definitions and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// #4 Initialize an Express application
const app = express();

// #5 Disable unwanted Headers
app.disable('x-powered-by');

// #6 Serve react application
app.use(express.static('dist'));

// #7 Use the Express application as middleware in Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV.trim() === 'development'
});
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen({ port: process.env.PORT || 8080 }, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});

// app.get('/api/getUsername', (req, res) => {
//   res.send({ username: os.userInfo().username });
// });
