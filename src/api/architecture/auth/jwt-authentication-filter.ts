import { environment } from '../../environment.server';
import * as jwt from 'jsonwebtoken';
import logger from '../logger';
import { jwtTokenFilter } from './jwt-authorization-filter';

/**
 * express middleware function,
 * implements username password authentication
 * @param req
 * @param res
 * @param next
 */
export function login(req, res, next) {
  if (!req.body || !(req.body.username && req.body.password)) {
    res.status(401).send();
  } else {
    logger.debug('Attempt username password authorization');
    // TODO: scrub against user list in db after db is setup
    if (req.body.username === 'user@example.com' && req.body.password === 'password') {
      logger.debug(`Authorized user [${req.body.username}]`);
      generateToken({
        username: req.body.username
      })
      .then((token) => res.json({token: token}))
      .catch(err => next(err));
    } else {
      res.status(401).send();
    }
  }
}

/**
 * jwt token authentication
 * @param req
 * @param res
 * @param next
 */
export function refreshToken(req, res, next) {
  logger.debug('Attempt jwt token refresh');
  if (req.user && req.user.username) {
    generateToken({
      username: req.user.username
    })
    .then((token) => res.json({token: token}))
    .catch(error => next(error));
  }
}


function generateToken (claim): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(claim,
      environment.jwtSecret,
      {
        algorithm: 'HS512',
        expiresIn: '3 days'
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
