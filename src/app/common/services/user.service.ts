import { ValidationError } from '../models/validation-error';
import { User } from '../models/user';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, Observable, of, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = new Subject<boolean>();
  loggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const timeStamp = localStorage.getItem(AUTH_LAST_REFRESH_KEY);
    if (token) {
      const gap = Math.abs(new Date().getTime() - new Date(timeStamp).getTime());
      if (gap >= 259200000) {
        this.logout(); // 3 days, token expired
      } else if (gap >= 172800000) {
        this.refreshToken(); // 2 days, refresh the token
      }
    }
  }

  getAuthToken(): string {
    return isPlatformServer(this.platformId) ? '' : localStorage.getItem(AUTH_TOKEN_KEY);
  }

  login(email: string, password: string): Observable<boolean>  {
    return this.http.post(`${environment.api}login`, {
      email: email,
      password: password
    }).pipe(map((res: any) => {
      localStorage.setItem(AUTH_TOKEN_KEY, res.token);
      localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
      this.isLoggedIn.next(true);
      return true;
    }));
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_LAST_REFRESH_KEY);
    this.isLoggedIn.next(false);
  }

  refreshToken(): void {
    this.http.get(`${environment.api}refreshToken`)
    .pipe(catchError((err, caught) => {
      return of('');
    }))
    .subscribe((res: any) => {
      if (res && res.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
      } else {
        this.logout();
      }
    });
  }

  register(user: User, token: string): Observable<Array<ValidationError> | boolean> {
    return this.http.post(`${environment.api}user?token=${token}`, user, {observe: 'response'})
    .pipe(
      catchError((err, caught) => {
        return of(err.error);
      }),
      map(res => {
        if (res.status === 200) {
          return true;
        }
        return res.error;
      }));
  }

  forgetPassword(email: string): Observable<boolean> {
    return this.http.get(`${environment.api}activation?email=${encodeURI(email)}`, {observe: 'response'})
    .pipe(
      catchError((err, caught) => of(null)),
      map(res => res && res.status === 200));
  }

  validateActivation(token: string): Observable<string> {
    return this.http.get(`${environment.api}activation?code=${token}`)
    .pipe(
      catchError((err, caught) => of({})),
      map((res: any) => res.email));
  }

  setPassword(code: string, password: string): void {
    this.http.post(`${environment.api}activation`, {
      code: code,
      password: password,
    }).subscribe((res: any) => {
      if (res && res.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
        this.isLoggedIn.next(true);
      }
    });
  }
}

const AUTH_TOKEN_KEY = 'CABOODEL::AUTH_TOKEN';
const AUTH_LAST_REFRESH_KEY = 'CABOODEL::LAST_REFRESH';
