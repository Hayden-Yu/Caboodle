import { UserActivation } from '../models/user-activation.model';
import { environment } from './../../environment.server';
import { mail, senderAddress } from './../../architecture/mail';
import { User } from '../models/user.model';
import { eventEmitter } from './../../architecture/event-emitter';
import logger from '../../architecture/logger';
import * as uuid from 'uuid/v4';

export const CONTACT_US_EVENT = 'contact-us-event';
eventEmitter.on(CONTACT_US_EVENT, (user: User) => {
  
    mail.sendMail({
      from: senderAddress,
      to: user.email,
      subject: 'Thank you for contacting us!',
      html: `<h3>API Caboodle</h3>
      <p>Please check <a href="${environment.host}/activate/">this link</a> to activate your account</p>
      <p style="color:#998;">or go to [${environment.host}/activate/ if you have trouble opening the link</p>
      `
    }).then((info) => {
      logger.info(`Email sent ${info.messageId}`);
    })
    .catch((err) => {
      logger.error(`Email error ${err}`);
    });
  
});
