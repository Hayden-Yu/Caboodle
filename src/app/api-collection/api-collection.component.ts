import { Router } from '@angular/router';
import { UserService } from './../common/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Collection } from '../common/models/collection';
import { User } from '../common/models/user';


@Component({
  selector: 'app-api-collection',
  templateUrl: './api-collection.component.html'
})


export class ApiCollectionComponent implements OnInit {

  user: User;
  searchDropdown: boolean;
  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => this.user = u);
    this.searchDropdown = false;
  }

  selectCollection(c: Collection) {
    this.router.navigate([`/collection`, 'detail', c.id]);
  }

  openSearch() {
    setTimeout(() => this.searchDropdown = true, 300);
  }
}
