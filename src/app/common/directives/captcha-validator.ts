import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Injectable()
export class CaptchaValidator {

  constructor(private http: HttpClient) {
  }

  public validateToken( token: string ): AsyncValidatorFn {
    return ( _: AbstractControl ) => {
      return this.http.get(`${environment.api}captcha`, { params: { token } })
      .pipe(
      catchError((err, caught) => of({})),
      map((res: any) => (res && res.success) ? null : {invalidToken: true}));
    };
  }
}
