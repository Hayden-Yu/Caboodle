import { UserActivation } from './../models/user-activation.model';
import { environment } from './../../environment.server';
import { mail, senderAddress } from './../../architecture/mail';
import { User } from './../../../app/common/services/user';
import { eventEmitter } from './../../architecture/event-emitter';
import logger from '../../architecture/logger';
import { Action } from 'rxjs/internal/scheduler/Action';

export const USER_CREATED_EVENT = 'user-created-event';
eventEmitter.on(USER_CREATED_EVENT, (act: UserActivation) => {
  act.findUser().then(activation => {
    mail.sendMail({
      from: senderAddress,
      to: activation.user.email,
      subject: 'Welcome to Caboodle',
      html: `<h3>Welcome to API Cabooble</h3>
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
