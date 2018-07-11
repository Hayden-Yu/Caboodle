import logger from '../logger';

export function jwtErrorHandler(err, req, res, next) {
  if (err.name && (err.name === 'TokenExpiredError'
    || err.name === 'JsonWebTokenError')) {
    logger.info(`JWT error ${err.message}`);
    next({
      status: 401,
      message: `authorization token error ${err.message}`
    });
    return;
  }
  next(err);
}
