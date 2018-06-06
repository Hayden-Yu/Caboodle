import { Collection } from './../models/collection.model';
import { eventEmitter } from './../../architecture/event-emitter';
import { UserActivation } from './../models/user-activation.model';
import { User } from './../models/user.model';
import * as express from 'express';
import { login } from '../../architecture/auth/jwt-authentication-filter';
import { USER_CREATED_EVENT } from '../events/user-created-event';
import * as uuid from 'uuid/v4';
import { environment } from './../../environment.server';
import fetch from 'node-fetch';
import { Endpoint } from '../models/endpoint.model';

export const router = express.Router();

router.param('userId', (req: any, res, next, id) => {
  User.findById(id, {
    include: [{
      model: Collection,
      include: [Endpoint]
    }]
  })
  .then((user) => {
    req.user = user;
    next();
  });
});

router.get('/user/:userId', (req: any, res, next) => {
  if (!req.auth) {
    res.send(401);
  } else if (req.user) {
    req.user.password = undefined;
    req.user.salt = undefined;
    req.user.updatedAt = undefined;
    res.json(req.user);
  } else {
    res.send(404);
  }
});

router.post('/user', (req, res, next) => {
  fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${environment.captchaKey}&response=${req.query.token}`, {
    method: 'POST'
  })
  .then(result => result.json())
  .then(captcha => {
    if (captcha && captcha.success) {
      const user = User.build({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      user.validate({skip: ['password', 'salt']})
      .then(error => {
        if (error) {
          res.status(400).json({ error: error.errors });
        }  else {
          user.save()
          .then(u => {
            res.send();
            eventEmitter.emit(USER_CREATED_EVENT, u);
          })
          .catch(err => {
            if (err.message === 'Validation error') {
              res.status(400).json({ error: err.errors });
            } else {
              next(err);
            }
          });
        }
      })
      .catch(err => next(err));
    } else {
      res.status(400).json({error: 'invalid captcha token'});
    }
  })
  .catch(next);
});

