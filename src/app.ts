import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { graphqlHTTP } from 'express-graphql';
import { envConfig, corsOptions } from './config';
import { schema } from './schema';

const { NODE_ENV } = envConfig;

const app: Application = express();

app.use(helmet.hidePoweredBy());
app.use(cors(corsOptions));

if (NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

export default app;
