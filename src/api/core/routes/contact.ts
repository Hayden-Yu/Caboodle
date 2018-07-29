import { eventEmitter } from '../../architecture/event-emitter';
import { Contact } from '../models/contact.model';
import * as express from 'express';
import { CONTACT_US_EVENT } from '../events/contact-us-event';

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
  contact.save()
  .then(u => {
    res.send();
    eventEmitter.emit(CONTACT_US_EVENT, u);
  })
  .catch(err => {
    if (err.message === 'Validation error') {
      res.status(400).json({ error: err.errors });
    } else {
      next(err);
    }
  });
});
