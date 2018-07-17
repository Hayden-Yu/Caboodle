import { EndpointCreateComponent } from './endpoint-create/endpoint-create.component';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from './../common/models/user';
import { UserService } from './../common/services/user.service';
import { EndpointResponse } from './../common/models/endpoint-response';
import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { EndpointRequestComponent } from './endpoint-request/endpoint-request.component';
import { Component, OnInit, ViewChild, OnDestroy, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { URL_REGEX } from '../common/constants';
import { Endpoint } from '../common/models/endpoint';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styles: []
})
export class EndpointComponent implements OnInit, OnDestroy {

  @ViewChild(EndpointRequestComponent)
  private requestComponent: EndpointRequestComponent;

  request: Endpoint;
  response: EndpointResponse;
  user: User;

  private modal: NgbModal;
  private _routeSub: Subscription;
  invalidRequest = false;
  saved = false;
  alertTimer;
  constructor(private apiSercice: CaboodleApiService,
    private route: ActivatedRoute,
    private userSerivce: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector) {
      if (isPlatformBrowser(platformId)) {
        this.modal = injector.get(NgbModal);
      }
    }

  ngOnInit() {
    this.response = new EndpointResponse();
    this.userSerivce.getCurrentUser().subscribe(u => this.user = u);
    this.userSerivce.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.user = undefined;
      }
    });
    this._routeSub = this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.apiSercice.getEndpointById(id)
          .subscribe(e => this.request = e);
      }
    });
  }

  sendRequest() {
    const request = this.requestComponent.getEndpoint();
    if (request.method && URL_REGEX.test(request.url)) {
      this.invalidRequest = false;
      this.apiSercice.invokeEndpoint(request)
        .subscribe(result => this.response = result);
    } else {
      this.showInvalidRequest();
    }
  }

  ngOnDestroy() {
    if (this._routeSub) {
      this._routeSub.unsubscribe();
    }
  }

  isOwner() {
    if (!this.request || !this.request.collectionId) {
      return true;
    }
    if (this.user && this.user.collections) {
      for (const c of this.user.collections) {
        if (c.id === this.request.collectionId) {
          return true;
        }
      }
    }
    return false;
  }

  showInvalidRequest() {
    this.saved = false;
    this.invalidRequest = true;
    if (this.alertTimer) {
      clearTimeout(this.alertTimer);
    }
    this.alertTimer = setTimeout(() => this.invalidRequest = false, 10000);
  }

  showSaved() {
    this.saved = true;
    this.invalidRequest = false;
    if (this.alertTimer) {
      clearTimeout(this.alertTimer);
    }
    this.alertTimer = setTimeout(() => this.saved = false, 10000);
  }

  save() {
    const request = this.requestComponent.getEndpoint();
    console.log(request);
    if (!request.method || !URL_REGEX.test(request.url)) {
      this.showInvalidRequest();
      return;
    }
    this.invalidRequest = false;
    if (request._id) {
      this.apiSercice.updateEndpoint(request._id, this.request)
        .subscribe(res => {
          if (res) {
            this.request = res;
            this.showSaved();
          }
        });
      return;
    }
    const modalRef = this.modal.open(EndpointCreateComponent, { size: 'lg', beforeDismiss: () => false });
    modalRef.componentInstance.collections = this.user.collections;
    modalRef.componentInstance.setEndpoint(request);
    modalRef.result.then((e: Endpoint) => {
      if (e) {
        this.request = e;
        this.showSaved();
      }
    });
  }
}
