import { UserService } from './../common/services/user.service';
import { User } from './../common/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styles: []
})
export class AccountProfileComponent implements OnInit {

  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => this.user = user);
  }

}
