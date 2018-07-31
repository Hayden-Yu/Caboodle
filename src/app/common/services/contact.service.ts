import { Contact } from '../models/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })

export class ContactService {

  constructor(private http: HttpClient) {}
  contactMail(contact: Contact) {
    return this.http.post(`${environment.api}contact`, contact).pipe(map((res: any) => res));
  }
}
