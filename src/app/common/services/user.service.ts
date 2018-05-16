import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = new Subject<boolean>();
  loggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
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
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  login(email: string, password: string): Observable<void>  {
    return this.http.post(`${environment.api}login`, {
      username: email,
      password: password
    }).pipe(map((res: any) => {
      localStorage.setItem(AUTH_TOKEN_KEY, res.token);
      localStorage.setItem(AUTH_LAST_REFRESH_KEY, new Date().toISOString());
      this.isLoggedIn.next(true);
    }));
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
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
}

const AUTH_TOKEN_KEY = 'CABOODEL::AUTH_TOKEN';
const AUTH_LAST_REFRESH_KEY = 'CABOODEL::LAST_REFRESH';
