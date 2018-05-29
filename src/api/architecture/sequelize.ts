import { environment } from './../environment.server';
import { Sequelize } from 'sequelize-typescript';
import logger from './logger';

export const sequlize = new Sequelize(
  {
    dialect: 'mysql',
    host: environment.database.host,
    port: environment.database.port || 3306,
    database: environment.database.database,
    username: environment.database.username,
    password: environment.database.password,
    pool: {
      max: 15,
      min: 3,
      acquire: 10000
    },
    logging: logger.debug.bind(logger),
  });
