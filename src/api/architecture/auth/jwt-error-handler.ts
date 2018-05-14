import logger from '../logger';

export function jwtErrorHandler(err, req, res, next) {
  if (err.name) {
    if (err.name === 'TokenExpiredError'
    || err.name === 'JsonWebTokenError') {
      logger.info(`JWT error ${err.message}`);
      res.status(401).send();
    } else {
      next(err);
    }
    return;
  }
  next(err);
}
