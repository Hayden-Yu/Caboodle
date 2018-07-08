import { environment } from './../environment.server';
import * as mongoose from 'mongoose';
import logger from './logger';

let auth = '';
if (environment.mongodb.username) {
  auth = `${environment.mongodb.username}:${environment.mongodb.password}@`;
}

mongoose.connect(
  `mongodb://${auth}${environment.mongodb.host}:${environment.mongodb.port || 27017}/${environment.mongodb.database}`,
  err => {
    if (err) {
      logger.error(err.message);
    }
});
