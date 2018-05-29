import { UserService } from './../../common/services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  template: `
    <div class="form-group row">
      <div class="">
      </div>
    </div>
  `,
  styles: []
})
export class ForgetPasswordComponent implements OnInit {
  @Input() email: string;
  errMsg: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
