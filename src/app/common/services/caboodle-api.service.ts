import { EndpointResponse } from './../models/endpoint-response';
import { Collection } from './../models/collection';
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

  findCollections(queryType: 'collection' | 'endpoint', name?: string): Observable<Collection[]> {
    let param = '';
    if (name) {
      param += `query=${name}`;
    }
    return this.http.get(`${environment.api}${queryType}${param ? '?' : ''}${param}`)
      .pipe(map((res: any) => res));
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.http.get(`${environment.api}collection/${id}`)
      .pipe(map((res: any) => res));
  }

  getEndpointById(id: string): Observable<Endpoint> {
    return this.http.get(`${environment.api}endpoint/${id}`)
      .pipe(map((res: any) => res));
  }

  createCollection(collection: Collection): Observable<Collection> {
    return this.http.post(`${environment.api}collection`, collection)
      .pipe(map((res: any) => res));
  }

  createEndpoint(endpoint: Endpoint): Observable<Endpoint> {
    return this.http.post(`${environment.api}endpoint`, endpoint)
      .pipe(map((res: any) => res));
  }

  updateEndpoint(id: string, endpoint: Endpoint): Observable<Endpoint> {
    return this.http.put(`${environment.api}endpoint/${id}`, endpoint)
      .pipe(map((res: any) => res));
  }

  invokeEndpoint(request: Endpoint): Observable<EndpointResponse> {
    return this.http.post(`${environment.api}endpoint/invocation`, request)
      .pipe(map((res: any) => res));
  }
}
