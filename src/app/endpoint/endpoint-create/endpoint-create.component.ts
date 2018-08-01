import { UserService } from './../../common/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CaboodleApiService } from './../../common/services/caboodle-api.service';
import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../../common/models/endpoint';
import { Collection } from '../../common/models/collection';

@Component({
  selector: 'app-endpoint-create',
  templateUrl: './endpoint-create.component.html',
  styles: []
})
export class EndpointCreateComponent implements OnInit {

  endpoint: Endpoint;
  collections: Collection[];
  validationAttempt = false;
  constructor(private apiService: CaboodleApiService,
    private userService: UserService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(u => this.collections = u.collections);
  }

  setEndpoint(endpoint: Endpoint) {
    if (endpoint) {
      this.endpoint = endpoint;
      if (!this.endpoint.name) {
        this.endpoint.name = this.endpoint.url.replace(/^(https?:\/\/)?(www\.)?(.*)$/, '$3');
      }
    }
  }

  save() {
    this.validationAttempt = true;
    if (!this.endpoint.name || !this.endpoint.collectionId) {
      return;
    }
    this.apiService.createEndpoint(this.endpoint)
      .subscribe(res => this.activeModal.close(res));
  }

  cancel() {
    this.activeModal.close();
  }

}
