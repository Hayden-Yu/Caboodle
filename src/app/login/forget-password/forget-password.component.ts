import { EMAIL_REGEX } from './../../common/constants';
import { UserService } from './../../common/services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="card-title"><h5>Please enter your email:</h5></div>
        <div class="form-group row">
          <div class="col-12">
            <input type="text" class="form-control" placeholder="Email Address" autofocus
            [ngClass]="{'is-invalid': !!errMsg}" [(ngModel)]="email" (blur)="validate()">
            <div class="invalid-feedback">{{ errMsg }}</div>
          </div>
        </div>
        <button class="btn btn-primary" (click)="submitForm()">Recover Password</button>
      </div>
      <div class="card-footer" [hidden]="!sent">A recovery link was sent to your email</div>
    </div>
  `,
  styles: []
})
export class ForgetPasswordComponent implements OnInit {
  @Input() email: string;
  errMsg: string;
  sent: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sent = false;
  }

  validate() {
    this.errMsg = this.email && EMAIL_REGEX.test(this.email) ? '' : 'This is not a valid email address';
  }

  submitForm() {
    this.validate();
    if (!this.errMsg) {
      this.userService.forgetPassword(this.email)
      .subscribe(res => {
        this.sent = res;
        if (!res) {
          this.errMsg = 'This email is not registered with us';
        }
      });
    }
  }

}
