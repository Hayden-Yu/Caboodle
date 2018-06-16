import { UserService } from './../common/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Collection } from '../common/models/collection';
import { User } from '../common/models/user';


@Component({
  selector: 'app-api-collection',
  templateUrl: './api-collection.component.html'
})


export class ApiCollectionComponent implements OnInit {

  collection: Collection;
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => this.user = u);
  }

  selectCollection(c: Collection) {
    this.collection = c;
    console.log(c);
  }
}
