import { Forum } from '../models/forum';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of, observable } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { ValidationError } from '../models/validation-error';

@Injectable({
    providedIn: 'root'
  })

export class ForumService {
    // private isLoggedIn = new Subject<boolean>();
   //  loggedIn$ = this.isLoggedIn.asObservable();

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    createArticle(forum: Forum): Observable<Forum> {
        console.log('In Create Article Service');
        return this.http.post(`${environment.api}forum`, forum).pipe(map((res: any) => res));
    }
    getArticleList(): Observable<Forum> {
        console.log('In Get Article Service');
        return this.http.get(`${environment.api}forum`).pipe(map((res: any) => res));
    }
}

const AUTH_TOKEN_KEY = 'CABOODEL::AUTH_TOKEN';
const AUTH_LAST_REFRESH_KEY = 'CABOODEL::LAST_REFRESH';
