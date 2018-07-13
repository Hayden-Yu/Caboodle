import { URL_REGEX } from './../../common/constants';
import { Endpoint, Param } from './../../common/models/endpoint';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endpoint-request',
  templateUrl: './endpoint-request.component.html',
  styles: []
})
export class EndpointRequestComponent implements OnInit {

  @Input() endpoint: Endpoint;

  requestBody: boolean;
  newHeader: Param;
  newFormData: Param;
  urlTouched: boolean;
  constructor() {
  }

  getEndpoint(): Endpoint {
    const endpoint = new Endpoint();
    endpoint.method = this.endpoint.method;
    endpoint.url = this.endpoint.url;
    if (this.endpoint._id) {
      endpoint._id = this.endpoint._id;
    }
    if (this.requestBody) {
      endpoint.body = {
        type: this.endpoint.body.type,
      };
      if (endpoint.body.type === 'form-data') {
        this.endpoint.body.formData.forEach((el) => {
          endpoint.body.formData.push({
            key: el.key,
            value: el.value,
          });
        });
        if (this.newFormData.key) {
          endpoint.body.formData.push({
            key: this.newFormData.key,
            value: this.newFormData.value,
          });
        }
      } else {
        endpoint.body.raw = this.endpoint.body.raw;
      }
      this.endpoint.headers.forEach((el) => {
        endpoint.headers.push({
          key: el.key,
          value: el.value,
        });
      });
      if (this.newHeader.key) {
        endpoint.headers.push({
          key: this.newHeader.key,
          value: this.newHeader.value,
        });
      }
    }
    return endpoint;
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
    this.requestBody = (!!this.endpoint.body) && (this.endpoint.method !== 'GET');
    this.urlTouched = false;
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

  invalidUrl() {
    return this.urlTouched && !URL_REGEX.test(this.endpoint.url);
  }

}
