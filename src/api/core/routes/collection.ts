import * as express from 'express';
import { Collection } from '../models/collection.model';
import { User } from '../models/user.model';
import { URL_REGEX } from '../../../app/common/constants';

export const router = express.Router();

router.param('collectionId', (req: any, res, next, id) => {
  Collection.findById(id, {
    include: [{
    model: User,
    attributes: {
      exclude: ['password', 'salt', 'updatedAt']
    }
  }]})
  .then(((collection) => {
    req.collection = collection;
    next();
  }))
  .catch(next);
});

router.get('/collection/:collectionId', async (req: any, res, next) => {
  if (req.collection) {
    await req.collection.attatchEndpoints();
    res.json(req.collection);
  } else {
    next({
      status: 404,
      message: 'collection not found',
    });
  }
});

router.get('/collection', (req: any, res, next) => {
  const where: any = {};
  if (req.query.query) {
    where.$or = {
      name: {$like: `%${req.query.query}%`},
      category: {$like: `%${req.query.query}%`}
    };
  }
  Collection.findAll({
    where: where,
    limit: req.query.limit || 200,
    offset: req.query.offset || 0
  })
  .then(collections => res.json(collections))
  .catch(next);
});

router.post('/collection', async (req: any, res, next) => {
  if (!req.auth) {
    next({
      status: 401,
      message: 'unaothorized',
    });
    return;
  }
  if (!req.body.name) {
    next({ status: 400, message: 'name is required' });
    return;
  }
  if (req.body.website && !URL_REGEX.test(req.body.website)) {
    next({ status: 400, message: 'invalid url' });
    return;
  }
  req.body.createdBy = req.auth.id;
  try {
    res.json(await Collection.create(req.body));
  } catch (err) {
    next(err);
  }
});
