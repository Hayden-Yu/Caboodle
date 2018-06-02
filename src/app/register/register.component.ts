import { CaptchaValidator } from './../common/directives/captcha-validator';
import { ValidationError } from './../common/services/validation-error';
import { UserService } from './../common/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from '../common/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  errorMsg: string;
  errorMsgTimer;
  success: boolean;

  constructor(private formBuilder: FormBuilder,
    private userSerivce: UserService,
    private router: Router) { }

  ngOnInit() {
      this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      firstName: '',
      lastName: '',
      captcha: ['', Validators.required],
    });
    this.errorMsg = '';
    this.success = false;
  }

  invalidControl(formControlName: string): boolean {
    return this.userForm.get(formControlName).invalid
    && this.userForm.get(formControlName).touched;
  }

  submitForm() {
    console.log(this.userForm);
    if (!this.userForm.valid) {
      return;
    }
    if (this.errorMsgTimer) {
      this.errorMsg = '';
      this.success = false;
      clearTimeout(this.errorMsgTimer);
    }
    this.userSerivce.register({
      email: this.userForm.get('email').value.trim(),
      firstName: this.userForm.get('firstName').value.trim(),
      lastName: this.userForm.get('lastName').value.trim()
    }).subscribe(res => {
      if (res instanceof Array || !res) {
        const errs = res as Array<ValidationError>;
        if (errs.length) {
          this.errorMsg = errs[0].message;
          if (this.errorMsg === 'email must be unique') {
            this.errorMsg = 'Email is already registered';
          }
        } else {
          this.errorMsg = 'Registred failed, please try again later';
        }
        this.errorMsgTimer = setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      } else {
        this.success = true;
        this.errorMsgTimer = setTimeout(() => {
          this.success = false;
        }, 5000);
      }
    });
  }
}
