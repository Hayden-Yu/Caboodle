import { ValidationError } from '../models/validation-error';
import { Contact } from '../models/contact';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, Observable, of, observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';


export class ContactService {

  constructor(private http: HttpClient) {}
  contactMail(contact: Contact) {
    return this.http.post(`${environment.api}contact`, contact).pipe(map((res: any) => res));
  }
}
