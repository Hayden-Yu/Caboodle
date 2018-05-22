import { environment } from './../environment.server';
import * as winston from 'winston';
const logger = new winston.Logger();

const config = {
  level: environment.logLevel ||  'info',
  transports: [],
};
if (environment.logFile) {
  config.transports.push(new winston.transports.File({ filename: environment.logFile }));
} else {
  config.transports.push(new winston.transports.Console());
}

logger.configure(config);
export default logger;
