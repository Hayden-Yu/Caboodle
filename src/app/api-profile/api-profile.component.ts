import { UserService } from './../common/services/user.service';
import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../common/models/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../common/models/user';

@Component({
  selector: 'app-api-profile',
  templateUrl: './api-profile.component.html',
  styleUrls: ['./api-profile.component.css']
})
export class ApiProfileComponent implements OnInit {
  collection: Collection;
  @Input() user: User;
  @Input() loadUser = false;
  private _collectionId: number;
  iframeLoad: boolean;

  constructor(private apiService: CaboodleApiService,
    private userService: UserService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.iframeLoad = false;
    if (this.loadUser) {
      this.userService.getCurrentUser()
        .subscribe(u => this.user = u);
    }
  }

  @Input() set collectionId(value: number) {
    this.apiService.getCollectionById(this._collectionId = value)
      .subscribe(c => this.collection = c);
  }

  favorite() {
    this.apiService.addAccountCollection(this.user.id, this.collection.id)
      .subscribe(user => this.user.collections = user.collections);
  }

  hasFavorite() {
    if (this.user && this.user.collections) {
      for (const co of this.user.collections) {
        if (co.id === this._collectionId) {
          return true;
        }
      }
    }
    return false;
  }

  iframeUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.collection.website);
  }
}
