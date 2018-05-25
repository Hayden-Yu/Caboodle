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

  constructor(private formBuilder: FormBuilder,
    private userSerivce: UserService,
    private router: Router) { }

  ngOnInit() {
      this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: '',
      lastName: ''
    });
    this.errorMsg = '';
  }

  invalidControl(formControlName: string): boolean {
    return this.userForm.get(formControlName).invalid
    && this.userForm.get(formControlName).touched;
  }

  submitForm() {
    if (!this.userForm.valid) {
      return;
    }
    this.userSerivce.register({
      email: this.userForm.get('email').value.trim(),
      password: this.userForm.get('password').value,
      firstName: this.userForm.get('firstName').value.trim(),
      lastName: this.userForm.get('lastName').value.trim()
    }).subscribe(errs => {
      if (errs && errs.length) {
        if (this.errorMsgTimer) {
          this.errorMsg = '';
          clearTimeout(this.errorMsgTimer);
        }
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
    });

    this.userSerivce.loggedIn$.subscribe(login => {
      if (login) {
        this.router.navigate(['/home']);
      }
    });
  }
}
