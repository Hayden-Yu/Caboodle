import { UserActivation } from '../models/user-activation.model';
import { environment } from './../../environment.server';
import { mail, senderAddress } from './../../architecture/mail';
import { User } from '../models/user.model';
import { eventEmitter } from './../../architecture/event-emitter';
import logger from '../../architecture/logger';
import * as uuid from 'uuid/v4';

export const USER_CREATED_EVENT = 'user-created-event';
eventEmitter.on(USER_CREATED_EVENT, (user: User) => {
  UserActivation.create({
    id: uuid(),
    userId: user.id,
  })
  .then(activation => {
    mail.sendMail({
      from: senderAddress,
      to: user.email,
      subject: 'Welcome to Caboodle',
      html: `<h3>Welcome to API Caboodle</h3>
      <p>Please check <a href="${environment.host}/activate/${activation.id}">this link</a> to activate your account</p>
      <p style="color:#998;">or go to [${environment.host}/activate/${activation.id}] if you have trouble opening the link</p>
      `
    }).then((info) => {
      logger.info(`Email sent ${info.messageId}`);
    })
    .catch((err) => {
      logger.error(`Email error ${err}`);
    });
  })
  .catch(logger.error);
});
