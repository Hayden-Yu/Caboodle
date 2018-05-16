import * as express from 'express';
import * as bodyParser from 'body-parser';
import { jwtTokenFilter } from './architecture/auth/jwt-authorization-filter';
import { login, refreshToken } from './architecture/auth/jwt-authentication-filter';
import { jwtErrorHandler } from './architecture/auth/jwt-error-handler';
import { cors } from './architecture/cors';

const router = express.Router();
router.use(cors);
router.use(bodyParser.json());
router.use(jwtTokenFilter);

router.post('/login', login);
router.get('/refreshToken', refreshToken);

router.use(jwtErrorHandler);
router.use((req, res) => res.status(404).send());
export default router;