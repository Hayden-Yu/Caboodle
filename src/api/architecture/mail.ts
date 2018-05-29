import * as mailer from 'nodemailer';
import { environment } from '../environment.server';

export const mail = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: environment.email.username,
    pass: environment.email.password
  }
});

export const senderAddress = `"Caboodle" <${environment.email.username}>`;
