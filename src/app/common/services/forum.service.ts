import { Forum } from '../models/forum';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of, observable } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class ForumService {
    // private isLoggedIn = new Subject<boolean>();
   //  loggedIn$ = this.isLoggedIn.asObservable();

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    createArticle(topic1: string): void {
        /*this.http.post(`${environment.api}forum`, {
            topic: topic1,
            message: message1,
        }).subscribe((res: any) => {
            if (res && res.token) {
                localStorage.setItem(AUTH_TOKEN_KEY, res.token);
                localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
                this.isLoggedIn.next(true);
            }
        });
        this.http.post(`${environment.api}forum`, {
            topic: topic1
        }).subscribe((res: any) => {
            if (res && res.token) {
                localStorage.setItem(AUTH_TOKEN_KEY, res.token);
                localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
                this.isLoggedIn.next(true);
            }
        });*/
    }
    getArticleList(): Observable<string[]> {
        return this.http.get(`${environment.api}forum`).pipe(map((res: any) => res));
    }
}

const AUTH_TOKEN_KEY = 'CABOODEL::AUTH_TOKEN';
const AUTH_LAST_REFRESH_KEY = 'CABOODEL::LAST_REFRESH';
