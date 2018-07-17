import { Comments } from './../models/comments.model';
import { environment } from './../../environment.server';
import * as clientEnv from '../../../environments/environment.prod';
import * as express from 'express';

export const router = express.Router();



/*router.get('/comments', (req: any, res, next) => {
    //
});

router.post('/forum', (req: any, res, next) => {
  if (!req.auth) {
    res.status(401).send();
  } else if (req.forum) {
    const article = Forum.build({
      subject: req.body.subject
    });
    article.save();
    res.send();
  }
});*/
