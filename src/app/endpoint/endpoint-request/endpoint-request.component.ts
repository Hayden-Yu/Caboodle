import { JsonEditorComponent } from './../../json-editor/json-editor.component';
import { URL_REGEX } from './../../common/constants';
import { Endpoint, Param } from './../../common/models/endpoint';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { JSONEditorOptions } from '../../json-editor/json-editor.component';

@Component({
  selector: 'app-endpoint-request',
  templateUrl: './endpoint-request.component.html',
  styles: []
})
export class EndpointRequestComponent implements OnInit {
  @ViewChild(JsonEditorComponent)
  private editor: JsonEditorComponent;

  _endpoint: Endpoint;

  requestBody: boolean;
  newHeader: Param;
  newFormData: Param;
  urlTouched: boolean;
  editorOptions: JSONEditorOptions;
  constructor() {
  }

  @Input() set endpoint(e: Endpoint) {
    if (e) {
      this._endpoint = e;
      if (!this._endpoint.body) {
        this._endpoint.body = {
          type: 'raw',
          formData: [],
          raw: '',
        };
      }
      if (!this._endpoint.headers) {
        this._endpoint.headers = [];
      }
      this.requestBody = (!!this._endpoint.body) && (this._endpoint.method !== 'GET');
      this.urlTouched = false;
      if (this._endpoint.body.raw) {
        setTimeout(() => this.editor.setText(this._endpoint.body.raw), 10);
      }
    }
  }

  getEndpoint(): Endpoint {
    const endpoint = new Endpoint();
    endpoint.method = this._endpoint.method;
    endpoint.url = this._endpoint.url;
    if (this._endpoint._id) {
      endpoint._id = this._endpoint._id;
    }
    if (this._endpoint.name) {
      endpoint.name = this._endpoint.name;
    }
    if (this.requestBody) {
      endpoint.body = {
        type: this._endpoint.body.type,
      };
      if (endpoint.body.type === 'form-data') {
        endpoint.body.formData = [];
        this._endpoint.body.formData.forEach((el) => {
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
        endpoint.body.raw = this.editor.getText();
        console.log(endpoint.body.raw);
      }
      endpoint.headers = [];
      this._endpoint.headers.forEach((el) => {
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
    if (this._endpoint.collectionId) {
      endpoint.collectionId = this._endpoint.collectionId;
    }
    return endpoint;
  }

  ngOnInit() {
    if (!this._endpoint) {
      this.endpoint = {
        name: '',
        url: '',
        method: 'GET',
        headers: [],
        body: {
          type: 'raw',
          formData: [],
          raw: '',
        }
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
    this.editorOptions = new JSONEditorOptions();
    this.editorOptions.modes = ['code', 'text'];
    this.editorOptions.mode = 'text';
  }

  addHeader() {
    if (!this._endpoint.headers) {
      this._endpoint.headers = [];
    }

    if (this.newHeader.key) {
      this._endpoint.headers.push(this.newHeader);
      this.newHeader = {
        key: '',
        value: ''
      };
    }
  }

  removeHeader(index: number) {
    this._endpoint.headers.splice(index, 1);
  }

  removeFormData(index: number) {
    this._endpoint.body.formData.splice(index, 1);
  }

  addNewFormData() {
    if (!this._endpoint.headers) {
      this._endpoint.body.formData = [];
    }

    if (this.newFormData.key) {
      this._endpoint.body.formData.push(this.newFormData);
      this.newFormData = {
        key: '',
        value: ''
      };
    }
  }

  invalidUrl() {
    return this.urlTouched && !URL_REGEX.test(this._endpoint.url);
  }

  toggleRequestBody($event) {
    if (this.requestBody = $event.target.checked) {
      setTimeout(() => this.editor.setText(this._endpoint.body.raw), 10);
    }
  }
}
