import { catchError } from 'rxjs/operators';
import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UserService } from './../common/services/user.service';
import { User } from './../common/models/user';
import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styles: []
})
export class AccountProfileComponent implements OnInit {

  user: User;

  modal: NgbModal;
  constructor(private userService: UserService,
    private apiService: CaboodleApiService,
    private router: Router,
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
      .pipe(catchError((err, caught) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        throw err;
      }))
      .subscribe(user => this.user = user);
  }

  updateProfile() {
    const modal = this.modal.open(UpdateAccountComponent, {size: 'lg'});
    modal.componentInstance.email = this.user.email;
    modal.componentInstance.firstName = this.user.firstName;
    modal.componentInstance.lastName = this.user.lastName;
    modal.result
    .then((user: User) => {
      this.userService.updateUser(this.user.id, user)
        .subscribe(u => this.user = u);
    })
    .catch(() => {});
  }

  deleteCollection(collectionId: number) {
    if (collectionId) {
      this.apiService.removeAccountCollection(this.user.id, collectionId)
      .subscribe(u => this.user = u);
    }
  }

}
