import { User } from './../../core/models/user.model';
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
        if (claim.email) {
          User.findOne({ where: {email: claim.email, active: true} })
          .then(user => {
            if (user) {
              logger.debug(`User [${claim.email}] authorized`);
              req.auth = user;
            }
          });
        }
      }
    });
  }
  next();
}
