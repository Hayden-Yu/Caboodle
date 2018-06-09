import { Subject, Observable, of, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CaboodleApiService {

  constructor(private http: HttpClient) { }

  removeAccountCollection(userId: number, collectionId: number): Observable<User> {
    return this.http.delete(`${environment.api}user/${userId}/collection/${collectionId}`)
      .pipe((res: any) => res);
  }
}
