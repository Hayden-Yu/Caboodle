import * as express from 'express';
import * as bodyParser from 'body-parser';
import { jwtTokenFilter } from './architecture/auth/jwt-authorization-filter';
import { login, refreshToken } from './architecture/auth/jwt-authentication-filter';
import { jwtErrorHandler } from './architecture/auth/jwt-error-handler';
import { cors } from './architecture/cors';

import * as user from './core/routes/user';
import * as collection from './core/routes/collection';
import * as activation from './core/routes/activation';

const router = express.Router();
router.use(cors);
router.use(bodyParser.json());
router.use(jwtTokenFilter);

router.post('/login', login);
router.get('/refreshToken', refreshToken);

router.use(user.router);
router.use(collection.router);
router.use(activation.router);

router.use(jwtErrorHandler);
router.use((req, res) => res.status(404).send());
export default router;
