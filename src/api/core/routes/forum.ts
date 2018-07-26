import { Forum } from '../models/forum.model';
import * as express from 'express';
import { User } from '../models/user.model';

export const router = express.Router();

router.param('forumID', (req: any, res, next, id) => {
  Forum.findById(id, {
    include: [User]
  })
  .then(((forum) => {
    req.forum = forum;
    next();
  }))
  .catch(next);
});

router.get('/forum', (req: any, res, next) => {
  Forum.findAll({
    include: [User]
  }).then(Forums => res.json(Forums))
  .catch(next);
});

router.post('/forum', (req: any, res, next) => {
  try {
    res.json(Forum.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/forum/:forumID', async (req: any, res, next) => {
  if (req.forum) {
    res.json(req.forum);
  } else {
    res.status(404).send();
  }
});
