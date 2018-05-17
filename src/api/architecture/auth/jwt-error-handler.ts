import logger from '../logger';

export function jwtErrorHandler(err, req, res, next) {
  if (err.name && (err.name === 'TokenExpiredError'
    || err.name === 'JsonWebTokenError')) {
    logger.info(`JWT error ${err.message}`);
    res.status(401).send();
  }
  next(err);
}
