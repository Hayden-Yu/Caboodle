import { User } from './../model/user.model';
import * as express from 'express';
import { login } from '../../architecture/auth/jwt-authentication-filter';

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
    } else if (!req.body.password || req.body.password.length < 6) {
      res.status(400).json({
        error: [{
          message: 'password should contain more than 6 characters',
          type: 'Validation error',
          path: 'password',
          value: {},
        }]
      });
    } else {
      user.setPassword(req.body.password);
      user.save()
      .then(e => login(req, res, next))
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
