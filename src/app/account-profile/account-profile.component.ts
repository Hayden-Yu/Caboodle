import { UpdateAccountComponent } from './update-account/update-account.component';
import { UserService } from './../common/services/user.service';
import { User } from './../common/models/user';
import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styles: []
})
export class AccountProfileComponent implements OnInit {

  user: User;

  modal: NgbModal;
  constructor(private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {
    if (isPlatformBrowser(platformId)) {
      this.modal = injector.get(NgbModal);
    }
  }

  ngOnInit() {
    this.user = new User();
    this.userService.getCurrentUser()
      .subscribe(user => this.user = user);
  }

  updateProfile() {
    const modal = this.modal.open(UpdateAccountComponent, {size: 'lg'});
    modal.componentInstance.email = this.user.email;
    modal.componentInstance.firstName = this.user.firstName;
    modal.componentInstance.lastName = this.user.lastName;
  }

}
