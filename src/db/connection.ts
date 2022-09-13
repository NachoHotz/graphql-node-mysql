import { DataSource } from 'typeorm';
import { envConfig } from '../config';

const { NODE_ENV, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = envConfig;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/entity/*.entity.ts'],
  synchronize: NODE_ENV === 'development',
  ssl: NODE_ENV === 'production',
});
