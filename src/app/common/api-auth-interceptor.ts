import { environment } from './../../environments/environment';
import { UserService } from './services/user.service';
import { Observable, Subscription } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
    private userService: UserService;
    private loginSubscription: Subscription;
    private loggedIn: boolean;
    private init = false;

    constructor(private injector: Injector) {
    }

    sudoOnInit() {
      this.userService = this.injector.get(UserService);

      this.loggedIn = true;
      if (this.userService.getAuthToken() === null) {
        this.loggedIn = false;
      }
      this.loginSubscription = this.userService.loggedIn$.subscribe(v => {
        this.loggedIn = v;
      });
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!this.init) {
        this.sudoOnInit();
        this.init = true;
      }
      if (req.url.indexOf(environment.api) !== 0 || !this.loggedIn) {
        return next.handle(req);
      }
      const token = this.userService.getAuthToken();
      const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(authReq);
    }
}
