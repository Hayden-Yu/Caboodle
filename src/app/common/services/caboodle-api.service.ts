import { EndpointResponse } from './../models/endpoint-response';
import { Collection } from './../models/collection';
import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Endpoint } from '../models/endpoint';

@Injectable({
  providedIn: 'root'
})
export class CaboodleApiService {

  constructor(private http: HttpClient) { }

  addAccountCollection(userId: number, collectionId: number): Observable<User> {
    return this.http.post(`${environment.api}user/${userId}/collection/${collectionId}`, undefined)
      .pipe(map((res: any) => res));
  }

  removeAccountCollection(userId: number, collectionId: number): Observable<User> {
    return this.http.delete(`${environment.api}user/${userId}/collection/${collectionId}`)
      .pipe(map((res: any) => res));
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(`${environment.api}collection/categories`)
      .pipe(map((res: any) => res));
  }

  getCollections(name?: string, category?: string): Observable<Collection[]> {
    let param = '';
    if (name) {
      param += `query=${name}`;
    }
    if (category) {
      param += `${param ? '&' : ''}category=${category}`;
    }
    return this.http.get(`${environment.api}collection${param ? '?' : ''}${param}`)
      .pipe(map((res: any) => res));
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.http.get(`${environment.api}collection/${id}`)
      .pipe(map((res: any) => res));
  }

  invokeEndpoint(request: Endpoint): Observable<EndpointResponse> {
    return this.http.post(`${environment.api}endpoint/invocation`, request)
      .pipe(map((res: any) => res));
  }
}
