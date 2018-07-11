import { URL_REGEX } from './../../../app/common/constants';
import * as express from 'express';
import { Collection } from '../models/collection.model';
import { Endpoint } from './../models/documents/endpoint.doc';

export const router = express.Router();

router.post('/endpoint', async (req: any, res, next) => {
  if (!req.body || !req.body.collectionId ||
    !req.body.method || !req.body.url ||
    !URL_REGEX.test(req.body.url)) {
    next({
      status: 400,
      message: 'malformed request'
    });
    return;
  }

  const collection = await Collection.findById(req.body.collectionId);
  if (!collection) {
    next({
      status: 400,
      message: 'collection does not exist',
    });
    return;
  }
  await Endpoint.create(req.body);

  res.json(collection);
});

router.post('/endpoint/invocation', (req: any, res, next) => {
  if (!req.body ||
    !req.body.method || !req.body.url) {
    next({
      status: 400,
      message: 'request parameter missing',
    });
    return;
  }
  if (!URL_REGEX.test(req.body.url)) {
    next({
      status: 400,
      message: 'malformed url',
    });
  }
});
