import { orm } from './../models/orm';
import * as express from 'express';
import { Collection } from './../models/collection.model';
import { Endpoint } from '../models/endpoint.model';

export const router = express.Router();

router.param('collectionId', (req: any, res, next, id) => {
  Collection.findById(id, {
    include: [{model: Endpoint}]
  })
  .then(((collection) => {
    req.collection = collection;
    next();
  }))
  .catch(next);
});

router.get('/collection/categories', (req, res, next) => {
  orm.query('SELECT DISTINCT `category` FROM `Collection`', { raw: true })
  .then((result) => {
    res.json(result[0]);
  });
});

router.get('/collection/:collectionId', (req: any, res, next) => {
  if (req.collection) {
    res.json(req.collection);
  } else {
    res.status(404).send();
  }
});

router.get('/collection', (req: any, res, next) => {
  const where: any = {};
  if (req.query.category) {
    where.category = req.query.category;
  }
  if (req.query.query) {
    where.name = {$like: `%${req.query.query}%`};
  }
  Collection.findAll({
    where: where,
    limit: req.query.limit || 200,
    offset: req.query.offset || 0
  })
  .then(collections => res.json(collections))
  .catch(next);
});
