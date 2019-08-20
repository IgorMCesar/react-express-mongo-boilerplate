import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

const loggerConfig = app => {
  morgan.token('graphql-query', req => {
    const { query, variables, operationName } = req.body;
    const { origin, cookie } = req.headers;
    if (query) {
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
    }
  });
  app.use(bodyParser.json());
  app.use(morgan(':graphql-query'));
};

export default loggerConfig;
