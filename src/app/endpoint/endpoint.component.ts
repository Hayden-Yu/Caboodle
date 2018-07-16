import { User } from './../common/models/user';
import { UserService } from './../common/services/user.service';
import { EndpointResponse } from './../common/models/endpoint-response';
import { EndpointResultComponent } from './endpoint-result/endpoint-result.component';
import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { EndpointRequestComponent } from './endpoint-request/endpoint-request.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { URL_REGEX } from '../common/constants';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styles: []
})
export class EndpointComponent implements OnInit {

  @ViewChild(EndpointRequestComponent)
  private requestComponent: EndpointRequestComponent;

  @ViewChild(EndpointResultComponent)
  private resultComponent: EndpointResultComponent;

  response: EndpointResponse;
  user: User;
  constructor(private apiSercice: CaboodleApiService,
    private userSerivce: UserService) { }

  ngOnInit() {
    this.response = new EndpointResponse();
    this.userSerivce.getCurrentUser().subscribe(u => this.user = u);
    this.userSerivce.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.user = undefined;
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
}
