import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  private userService: UserService,
  private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
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
      this.loginForm.get('password').value.trim()
    ).subscribe((() => {
      this.router.navigate(['/home']);
    }));
  }
}
