import * as express from 'express';
import * as bodyParser from 'body-parser';
import { jwtTokenFilter } from './architecture/auth/jwt-authorization-filter';
import { login, refreshToken } from './architecture/auth/jwt-authentication-filter';
import { jwtErrorHandler } from './architecture/auth/jwt-error-handler';
import { cors } from './architecture/cors';

import * as user from './core/routes/user';
import * as collection from './core/routes/collection';
import * as activation from './core/routes/activation';
import * as endpoint from './core/routes/endpoint';
import { serverErrorHandler } from './architecture/error/server-error-handler';
import logger from './architecture/logger';

const router = express.Router();
router.use(cors);
router.use(bodyParser.json());
router.use(jwtTokenFilter);

router.post('/login', login);
router.get('/refreshToken', refreshToken);

router.use(user.router);
router.use(collection.router);
router.use(activation.router);
router.use(endpoint.router);

router.use(jwtErrorHandler);
router.use(serverErrorHandler);
router.use((req, res) => res.status(404).json({
  message: 'you are lost'
}));
router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json(err);
});
export default router;
