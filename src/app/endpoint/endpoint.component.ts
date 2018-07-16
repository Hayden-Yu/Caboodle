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

  constructor(private apiSercice: CaboodleApiService) { }

  ngOnInit() {
  }

  sendRequest() {
    const request = this.requestComponent.getEndpoint();
    if (request.method && URL_REGEX.test(request.url)) {
      this.apiSercice.invokeEndpoint(request)
        .subscribe(console.log.bind(console)); // TODO: endpoint-result
    }
  }
}
