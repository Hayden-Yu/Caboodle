import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EMAIL_REGEX } from '../common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  private errorMsgTimer;

  constructor(private formBuilder: FormBuilder,
  private userService: UserService,
  private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
}
