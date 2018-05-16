import * as jwt from 'jsonwebtoken';
import { environment } from '../../environment.server';
import logger from '../logger';

export function jwtTokenFilter(req, res, next) {
  const header = req.get('Authorization');
  if (header && header.indexOf('Bearer ') === 0) {
    logger.debug('Auth header found');
    jwt.verify(header.replace(/^Bearer /, ''),
    environment.jwtSecret,
    {algorithms: ['HS512']},
    (err, claim: any) => {
      if (err) {
        next(err);
      } else {
        // TODO: attatch real user onto req
        if (claim.username && claim.username === 'user') {
          logger.debug(`User [${claim}] authorized`);
          req.user = {
            id: 1,
            username: 'user'
          };
        }
      }
    });
  }
  next();
}
