import { Comments } from './../models/comments.model';
import * as express from 'express';
import { User } from '../models/user.model';

export const router = express.Router();


router.param('articleID', (req: any, res, next, id) => {
  Comments.findAll({
    include: [User],
    where: {
      thread_id: id
    }
  }).then(Forums => res.json(Forums))
  .catch(next);
});

router.get('/comments/:articleID', async (req: any, res, next) => {
  if (req.comments) {
    res.json(req.comments);
  } else {
    res.status(404).send();
  }
});

router.post('/comments', (req: any, res, next) => {
  try {
    res.json(Comments.create(req.body));
  } catch (err) {
    next(err);
  }
});
