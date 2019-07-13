const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const MongoStore = require('connect-mongo')(session);
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schemas/schemas');
const resolvers = require('./graphql/resolvers/resolvers');
const schemaDirectives = require('./graphql/directives/directives');

const { NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_MAX_AGE, MONGO_DB_URI, PORT } = process.env;

const app = express();

mongoose.set('useCreateIndex', true);

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
// if (NODE_ENV !== 'development') {
app.use(express.static('dist'));
// }

// Set User Session
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESSION_MAX_AGE, 10),
      sameSite: true,
      httpOnly: true,
      secure: !NODE_ENV.trim() === 'development'
    }
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground:
    NODE_ENV.trim() !== 'development'
      ? false
      : {
          settings: {
            'request.credentials': 'include',
            'schema.polling.enable': false
          }
        },
  context: ({ req, res }) => ({ req, res })
});

// Logging with Morgan
if (NODE_ENV === 'development') {
  morgan.token('graphql-query', req => {
    const { query, variables, operationName } = req.body;
    const { origin, cookie } = req.headers;
    return [
      '\n\n',
      chalk.magenta.bold('-------GraphQL-------\n'),
      chalk.blue.bold('Origin:'),
      chalk.yellow.bold(origin),
      '\n',
      chalk.blue.bold('Cookie:'),
      chalk.yellow.bold(cookie),
      '\n',
      chalk.blue.bold('Operation Name:'),
      chalk.yellow.bold(operationName),
      '\n',
      chalk.blue.bold('Query: '),
      chalk.green.bold(query),
      chalk.blue.bold('Variables:'),
      chalk.yellow.bold(JSON.stringify(variables)),
      chalk.magenta.bold('\n---------------------')
    ].join(' ');
  });
  app.use(bodyParser.json());
  app.use(morgan(':graphql-query'));
}

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  }
});

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  const port = PORT || 8080;
  app.listen({ port }, () => {
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on('error', error => console.error(error));
