import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../common/services/user.service';
import { CaboodleApiService } from './../../common/services/caboodle-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../../common/models/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../common/models/user';

@Component({
  selector: 'app-api-profile',
  templateUrl: './api-collection-profile.component.html',
  styleUrls: ['./api-collection-profile.component.css']
})
export class ApiCollectionProfileComponent implements OnInit {
  collection: Collection;
  user: User;
  loadUser = false;
  private _collectionId: number;
  iframeLoad: boolean;
  emailName = /^(.*)@.*$/;
  constructor(private apiService: CaboodleApiService,
    private route: ActivatedRoute,
    private userService: UserService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.iframeLoad = false;
    this.userService.getCurrentUser().subscribe(u => this.user = u);
    this.route.paramMap.subscribe(param => {
      this.setCollectionId(parseInt(param.get('id'), 10));
    });
    this.userService.getCurrentUser()
      .subscribe(u => this.user = u);
  }

  setCollectionId(value: number) {
    this.apiService.getCollectionById(this._collectionId = value)
      .subscribe(c => this.collection = c);
  }

  favorite() {
    this.apiService.addAccountCollection(this.user.id, this.collection.id)
      .subscribe(user => this.user.bookmarks = user.bookmarks);
  }
  unfavorite() {
    this.apiService.removeAccountCollection(this.user.id, this.collection.id)
      .subscribe(user => this.user.bookmarks = user.bookmarks);
  }

  hasFavorite() {
    if (this.user && this.user.bookmarks) {
      for (const co of this.user.bookmarks) {
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
