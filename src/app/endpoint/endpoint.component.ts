import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from './../common/models/user';
import { UserService } from './../common/services/user.service';
import { EndpointResponse } from './../common/models/endpoint-response';
import { EndpointResultComponent } from './endpoint-result/endpoint-result.component';
import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { EndpointRequestComponent } from './endpoint-request/endpoint-request.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
  private _routeSub: Subscription;
  constructor(private apiSercice: CaboodleApiService,
    private route: ActivatedRoute,
    private userSerivce: UserService) { }

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
      this.apiSercice.invokeEndpoint(request)
        .subscribe(result => this.response = result);
    }
  }

  ngOnDestroy() {
    if (this._routeSub) {
      this._routeSub.unsubscribe();
    }
  }
}
