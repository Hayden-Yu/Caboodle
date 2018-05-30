import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EMAIL_REGEX } from '../common/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  private errorMsgTimer;

  private modal: NgbModal;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector) {
    if (isPlatformBrowser(this.platformId)) {
      this.modal = this.injector.get(NgbModal);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]]
    });
    this.errorMsg = '';
  }

  invalidControl(formControlName: string): boolean {
    return this.loginForm.get(formControlName).invalid
    && this.loginForm.get(formControlName).touched;
  }

  submitForm() {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.login(
      this.loginForm.get('username').value.trim(),
      this.loginForm.get('password').value
    )
    .pipe(catchError((err, caught) => {
      if (err.status === 401) {
        if (err && err.length) {
          this.errorMsg = 'Invalid Login';
        }
      }
      return of(false);
    }))
    .subscribe(((stat) => {
      if (stat) {
        this.router.navigate(['/home']);
      } else {
        if (this.errorMsgTimer) {
          this.errorMsg = '';
          clearTimeout(this.errorMsgTimer);
        }
        this.errorMsg = this.errorMsg || 'Login failed, please try again later';
        this.errorMsgTimer = setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      }
    }));
  }

  forgetPassword() {
    const modal = this.modal.open(ForgetPasswordComponent);
    modal.componentInstance.email = this.loginForm.get('username').value.trim();
    modal.result.then(email => {
      if (email) {
        this.loginForm.get('username').setValue(email);
      }
    });
  }
}
