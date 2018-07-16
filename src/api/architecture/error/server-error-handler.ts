import { ServerErr } from './server-err';
import logger from '../logger';

export function serverErrorHandler(err: ServerErr, req, res, next) {
  if (err.status) {
    logger.error(err.message);
    res.status(err.status).json({ message: err.message });
    return;
  }
  next(err);
}
