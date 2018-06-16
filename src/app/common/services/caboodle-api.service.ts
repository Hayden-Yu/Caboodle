import { Collection } from './../models/collection';
import { Category } from './../models/category';
import { Observable } from 'rxjs';
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

  getAllCategories(): Observable<Category[]> {
    return this.http.get(`${environment.api}collection/categories`)
      .pipe((res: any) => res);
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
      .pipe((res: any) => res);
  }
}
