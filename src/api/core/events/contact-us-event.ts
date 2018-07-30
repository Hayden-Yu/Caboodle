import { mail, senderAddress } from './../../architecture/mail';
import { Contact } from '../../../app/common/models/contact';
import { eventEmitter } from './../../architecture/event-emitter';
import logger from '../../architecture/logger';

export const CONTACT_US_EVENT = 'contact-us-event';
eventEmitter.on(CONTACT_US_EVENT, (contact: Contact) => {

    mail.sendMail({
      from: senderAddress,
      to: contact.email,
      subject: 'Caboodle Contact: ' + contact.topic,
      html: `<h3>API Caboodle</h3>
      <p>` +
      contact.firstName + ` ` + contact.lastName +
      `<br/>` + contact.message +
      ` </p> `

    }).then((info) => {
      logger.info(`Email sent ${info.messageId}`);
    })
    .catch((err) => {
      logger.error(`Email error ${err}`);
    });

});
