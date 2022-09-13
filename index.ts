import app from './src/app';
import { envConfig } from './src/config';
import { AppDataSource } from './src/db/connection';

const { API_PORT } = envConfig;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');

    app.listen(API_PORT, () => {
      console.log(`Server started on port ${API_PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection failed');
    console.error(err);
  });
