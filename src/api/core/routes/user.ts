import { eventEmitter } from './../../architecture/event-emitter';
import { UserActivation } from './../models/user-activation.model';
import { User } from './../models/user.model';
import * as express from 'express';
import { login } from '../../architecture/auth/jwt-authentication-filter';
import { USER_CREATED_EVENT } from '../events/user-created-event';
import * as uuid from 'uuid/v4';

export const router = express.Router();

router.param('userId', (req: any, res, next, id) => {
  User.findById(id)
  .then((user) => req.user = user);
});

router.post('/', (req, res, next) => {
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
});

