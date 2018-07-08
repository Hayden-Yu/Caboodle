import { User } from '../../core/models/user.model';
import { environment } from '../../environment.server';
import * as jwt from 'jsonwebtoken';
import logger from '../logger';

/**
 * express middleware function,
 * implements username password authentication
 * @param req
 * @param res
 * @param next
 */
export function login(req, res, next) {
  if (!req.body || !(req.body.email && req.body.password)) {
    res.status(401).send();
  } else {
    logger.debug('Attempt username password authorization');
    User.findOne({
      where: {email: req.body.email}
    }).then(user => {
      if (user && user.validatePassword(req.body.password)) {
        logger.debug(`Authorized user [${req.body.email}]`);
        generateToken({
          email: req.body.email,
          active: true,
        })
        .then((token) => res.json({token: token}))
        .catch(err => next(err));
      } else {
        logger.debug(`Authorization failed user [${req.body.email}]`);
        res.status(401).send();
      }
    });
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
  if (req.auth && req.auth.username) {
    generateToken({
      email: req.auth.username,
      active: true,
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
