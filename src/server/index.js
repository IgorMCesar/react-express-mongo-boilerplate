const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve react application
app.use(express.static('dist'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV.trim() === 'development'
});
server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => {
    app.use(
      session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        name: 'sid',
        secret: 'shh!secret!',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          sameSite: true,
          secure: !process.env.NODE_ENV.trim() === 'development'
        }
      })
    );
    app.listen({ port: process.env.PORT || 8080 }, () => {
      console.log(`Listening on port ${process.env.PORT || 8080}!`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
