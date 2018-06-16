import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../common/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Collection } from '../common/models/collection';
import { User } from '../common/models/user';


@Component({
  selector: 'app-api-collection',
  templateUrl: './api-collection.component.html'
})


export class ApiCollectionComponent implements OnInit {

  collectionId: number;
  user: User;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => this.user = u);
    const id = this.route.snapshot.paramMap.get('id');
    if (id && parseInt(id, 10)) {
      this.collectionId = parseInt(id, 10);
    }
  }

  selectCollection(c: Collection) {
    this.router.navigate([`/collection`, c.id]);
    this.collectionId = c.id;
  }
}
