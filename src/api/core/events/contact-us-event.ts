import { environment } from './../../environment.server';
import { mail, senderAddress } from './../../architecture/mail';
import { User } from '../models/user.model';
import { eventEmitter } from './../../architecture/event-emitter';
import logger from '../../architecture/logger';

export const CONTACT_US_EVENT = 'contact-us-event';
eventEmitter.on(CONTACT_US_EVENT, (user: User) => {
  
    mail.sendMail({
      from: senderAddress,
      to: user.email,
      subject: 'Caboodle Contact: Topic',
      html: `<h3>API Caboodle</h3>
      <p>
      First Name, Last Name 
      Message
      
      </p>
      `
    }).then((info) => {
      logger.info(`Email sent ${info.messageId}`);
    })
    .catch((err) => {
      logger.error(`Email error ${err}`);
    });
  
});
