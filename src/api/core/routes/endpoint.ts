import { default as fetch, Headers, RequestInit } from 'node-fetch';
import * as FormData from 'form-data';
import { URL_REGEX } from './../../../app/common/constants';
import * as express from 'express';
import { Collection } from '../models/collection.model';
import { Endpoint } from './../models/documents/endpoint.doc';
import { EndpointHistory } from '../models/documents/endpoint-history.doc';
import logger from '../../architecture/logger';
import { User } from '../models/user.model';
import { CastError } from 'mongoose';

export const router = express.Router();

router.param('endpointId', async (req: any, res, next, id) => {
  try {
    req.endpoint = await Endpoint.findById(id).exec();
  } catch (err) {
    if (!(err instanceof CastError)) {
      next(err);
    }
  }
  next();
});

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

  const collection = await Collection.findById(req.body.collectionId, {
    include: [{
      model: User,
      attributes: {
        exclude: ['password', 'salt', 'active']
      }
    }]
  });
  if (!collection) {
    next({
      status: 400,
      message: 'collection does not exist',
    });
    return;
  }

  if (!req.auth || req.auth.id !== collection.creator.id) {
    next({
      status: 401,
      message: 'not authorized',
    });
    return;
  }
  await collection.attatchEndpoints();
  for (const endpoint of collection._endpoints) {
    if (endpoint.name === req.body.name
      && endpoint.method === req.body.method) {
        next({
          status: 400,
          message: 'endpoint already exists',
        });
        return;
    }
  }

  await Endpoint.create(req.body);
  await collection.attatchEndpoints();
  res.json(collection);
});

router.post('/endpoint/invocation', async (req: any, res, next) => {
  if (!req.auth) {
    next({
      status: 401,
      message: 'not authorized',
    });
    return;
  }
  // validation
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
    return;
  }
  // prepare request
  const init: RequestInit = {
    method: req.body.method,
    timeout: 15000,
  };
  if (req.body.headers) {
    init.headers = new Headers();
    for (const header of req.body.headers) {
      init.headers.set(header.key, header.value);
    }
  }
  if (req.body.body) {
    const body = req.body.body.type === 'form-data' ? new FormData() : req.body.body.raw;
    if (req.body.body.type === 'form-data') {
      for (const el of req.body.body.formData) {
        body.append(el.key, el.value);
      }
    }
    init.body = body;
  }
  // make request
  try {
    logger.info(`http request to [${req.body.url}]`);
    const result = await fetch(req.body.url, init)
      .then(async response => {
        const r: any = {
          status: response.status,
          headers: []
        };
        response.headers.forEach((v, k) => r.headers.push({key: k, value: v}));
        r.body = await response.text();
        logger.info(`response status [${r.status}]`);
        logger.silly(`response body: ${r.body}`);
        return r;
      });
    res.json(result);
    result.userId = req.auth.id;
    // verify endpoint
    if (req.body._id) {
      const endpoint = await Endpoint.findById(req.body._id);
      if (endpoint) {
        result.endpoint = endpoint._id;
      }
    }
    // save history
    EndpointHistory.create(result, err => {
      if (err) {
        logger.error(err);
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/endpoint/:endpointId', (req: any, res, next) => {
  if (req.endpoint) {
    req.endpoint.__v = undefined;
    res.json(req.endpoint);
  } else {
    next({
      status: 404,
      message: 'collection not found',
    });
  }
});

router.get('/endpoint', async (req, res, next) => {
  const where: any = {};
  if (req.query.query) {
    where.$or = [
      { name: new RegExp(`.*${req.query.query}.*`) },
      { url: new RegExp(`.*${req.query.query}.*`) },
    ];
  }
  const collectionIds = await Endpoint.distinct('collectionId', where).exec();
  if (!collectionIds) {
    res.json([]);
    return;
  }

  Collection.findAll({
    where: { id: { $in: collectionIds } },
    limit: req.query.limit || 200,
    offset: req.query.offset || 0
  })
  .then(res.json.bind(res))
  .catch(next);
});
