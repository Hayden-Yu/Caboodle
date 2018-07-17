import { Forum } from '../models/forum.model';
import { environment } from './../../environment.server';
import * as clientEnv from '../../../environments/environment.prod';
import * as express from 'express';
import { User } from '../models/user.model';

export const router = express.Router();



router.get('/forum', (req: any, res, next) => {
  Forum.findAll({
    include: [User]
  }).then(Forums => res.json(Forums))
  .catch(next);
});

router.post('/forum', (req: any, res, next) => {
  if (!req.auth) {
    next({
      status: 401,
      message: 'unauthorized',
    });
    return;
  }
  if (!req.body.title) {
    next({ status: 400, message: 'title is required' });
    return;
  }
  if (!req.body.description) {
    next({ status: 400, message: 'description is required' });
    return;
  }
  req.body.user_id = req.auth.id;
  try {
    res.json(Forum.create(req.body));
  } catch (err) {
    next(err);
  }
  // res.json(Forum.create(req.body));
});
