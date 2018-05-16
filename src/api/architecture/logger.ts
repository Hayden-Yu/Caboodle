import * as winston from 'winston';
const logger = new winston.Logger();

logger.configure({
  level: 'silly'
});

export default logger;
