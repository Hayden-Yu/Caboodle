import { Endpoint, Param } from './../../common/models/endpoint';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-endpoint-request',
  templateUrl: './endpoint-request.component.html',
  styles: []
})
export class EndpointRequestComponent implements OnInit {

  @Input() endpoint: Endpoint;
  @Output() send: EventEmitter<Endpoint>;

  requestBody: boolean;
  newHeader: Param;
  newFormData: Param;
  constructor() {
    this.send = new EventEmitter();
  }

  ngOnInit() {
    if (!this.endpoint) {
      this.endpoint = {
        name: '',
        url: '',
        method: 'GET',
        headers: [],
        body: {
          type: 'raw',
          formData: [],
        }
      };
    }
    if (!this.endpoint.headers) {
      this.endpoint.headers = [];
    }
    if (!this.endpoint.body) {
      this.endpoint.body = {
        type: 'raw',
        formData: [],
      };
    }

    this.newHeader = {
      key: '',
      value: '',
    };
    this.newFormData = {
      key: '',
      value: '',
    };
    this.requestBody = !!this.endpoint.body;
  }

  addHeader() {
    if (!this.endpoint.headers) {
      this.endpoint.headers = [];
    }

    if (this.newHeader.key) {
      this.endpoint.headers.push(this.newHeader);
      this.newHeader = {
        key: '',
        value: ''
      };
    }
  }

  removeHeader(index: number) {
    this.endpoint.headers.splice(index, 1);
  }

  removeFormData(index: number) {
    this.endpoint.body.formData.splice(index, 1);
  }

  addNewFormData() {
    if (!this.endpoint.headers) {
      this.endpoint.body.formData = [];
    }

    if (this.newFormData.key) {
      this.endpoint.body.formData.push(this.newFormData);
      this.newFormData = {
        key: '',
        value: ''
      };
    }
  }

  toggleRequestBody() {
    if (this.requestBody) {

    }
  }
}
