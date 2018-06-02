import { environment } from './../../environment.server';
import fetch from 'node-fetch';

export function captcha(req, res, next) {
  const secret = environment.captchaKey;
  fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.query.captcha}`, {
    method: 'POST'
  })
  .then(result => result.json())
  .catch(next);
}
