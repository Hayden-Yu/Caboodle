import { eventEmitter } from '../../architecture/event-emitter';
import { Contact } from '../models/contact.model';
import * as express from 'express';
import { USER_CREATED_EVENT } from '../events/user-created-event';
import { environment } from '../../environment.server';
import fetch from 'node-fetch';
import * as clientEnv from '../../../environments/environment.prod';

export const router = express.Router();

router.get('/contact', async (req: any, res, next) => {});

router.post('/contact', (req, res, next) => {
  
  const contact = Contact.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message
  });
    
});
