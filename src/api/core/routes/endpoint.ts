import * as express from 'express';
import { Collection } from '../models/collection.model';
import { Endpoint } from './../models/documents/endpoint.doc';

export const router = express.Router();

router.post('/endpoint', async (req: any, res, next) => {
  if (!req.body || !req.body.collectionId ||
    !req.body.method || !req.body.url) {
    res.status(400).send();
    return;
  }

  const collection = await Collection.findById(req.body.collectionId);
  if (!collection) {
    res.status(400).send();
    return;
  }
  await Endpoint.create(req.body);

  res.json(collection);
});
