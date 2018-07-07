import { Forum } from './../models/forum.model';
import { environment } from './../../environment.server';
import * as clientEnv from '../../../environments/environment.prod';
import * as express from 'express';

export const router = express.Router();



router.get('/forum', (req: any, res, next) => {
  Forum.findAll({
  }).then(Forums => res.json(Forums))
  .catch(next);
});

/*router.post('/forum', (req: any, res, next) => {
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
