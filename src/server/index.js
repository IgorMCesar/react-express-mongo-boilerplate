const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const schemaDirectives = require('./graphql/directives');

const app = express();

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
app.use(express.static('dist'));

// Set User Session
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: 'sid',
    secret: 'shh!secret!',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: !process.env.NODE_ENV.trim() === 'development'
    }
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground:
    process.env.NODE_ENV.trim() !== 'development'
      ? false
      : {
        settings: {
          'request.credentials': 'include'
        }
      },
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({ app, cors: false });

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  app.listen({ port: process.env.PORT || 8080 }, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}!`);
  });
});
mongoose.connection.on('error', error => console.error(error));
