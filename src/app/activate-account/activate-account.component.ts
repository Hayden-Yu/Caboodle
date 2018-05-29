import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from './../common/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styles: []
})
export class ActivateAccountComponent implements OnInit {

  email: string;
  private code: string;
  form: FormGroup;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    this.email = '';
    this.userService.validateActivation(this.code).subscribe(email => {
      if (!email) {
        this.router.navigate(['/login']);
      }
      this.email = email;
    });
    this.form = this.fb.group({
      password: ['', [Validators.pattern(/^\S{6,}$/), Validators.required]],
      confirmation: ['', [confirmEntry('password'), Validators.required]]
    });
    this.userService.loggedIn$.subscribe(login => {
      if (login) {
        this.router.navigate(['/home']);
      }
    });
  }

  invalidControl(formControlName: string): boolean {
    return this.form.get(formControlName).invalid
    && this.form.get(formControlName).touched;
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.userService.setPassword(this.code, this.form.get('password').value);
  }
}


function confirmEntry(controlName: string): ValidatorFn {
  return function(control: FormControl): ValidationErrors {
    if (!control.parent || !control.parent.get(controlName)) {
      return {fieldNotFound: true};
    }

    return control.parent.get(controlName).value === control.value ?
    null : {nomatch: true};
  };
}
