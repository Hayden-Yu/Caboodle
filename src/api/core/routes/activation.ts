import { FORGET_PASSWORD_EVENT } from './../events/forget-password-event';
import * as express from 'express';
import { User } from '../models/user.model';
import { UserActivation } from '../models/user-activation.model';
import * as uuid from 'uuid/v4';
import { eventEmitter } from '../../architecture/event-emitter';
import { login } from '../../architecture/auth/jwt-authentication-filter';

export const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.query.code) {
    UserActivation.findById(req.query.code, {
      include: [User]
    }).then(activation => {
      if (activation) {
        res.json({
          email: activation.user.email,
        });
      } else {
        res.status(401).send();
      }
    })
    .catch(next);
  } else if (req.query.email) {
    User.findOne({where: {email: req.query.email}})
    .then(user => {
      if (user) {
        UserActivation.create({
          id: uuid(),
          userId: user.id,
        }).then(activation => {
          eventEmitter.emit(FORGET_PASSWORD_EVENT, activation);
          res.status(200).send();
        });
      } else {
        res.send(401);
      }
    })
    .catch(next);
  } else {
    res.status(400).send();
  }
});

router.post('/', (req, res, next) => {
  if (req.body.code && req.body.password) {
    if (!req.body.password || req.body.password.length < 6) {
      res.status(400).json({
        error: [{
          message: 'password should contain more than 6 characters',
          type: 'Validation error',
          path: 'password',
          value: {},
        }]
      });
    } else {
      UserActivation.findById(req.body.code, {
        include: [User]
      }).then(activation => {
        if (activation && activation.user) {
          const user = activation.user;
          req.body.email = user.email;
          user.setPassword(req.body.password);
          user.setDataValue('active', true);
          user.save().then(() => login(req, res, next));
          activation.destroy();
        } else {
          res.status(401).send();
        }
      })
      .catch(next);
    }
  } else {
    res.status(400).send();
  }
});
