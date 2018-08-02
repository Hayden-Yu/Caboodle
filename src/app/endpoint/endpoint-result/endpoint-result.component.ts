import { EndpointResponse } from './../../common/models/endpoint-response';
import { Component, OnInit, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';
import { JsonEditorComponent, JSONEditorOptions } from '../../json-editor/json-editor.component';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-endpoint-result',
  templateUrl: './endpoint-result.component.html',
  styles: []
})
export class EndpointResultComponent implements OnInit {

  _result: EndpointResponse = new EndpointResponse();
  saveAs: any;

  @ViewChild(JsonEditorComponent)
  private editor: JsonEditorComponent;
  editorOptions: JSONEditorOptions;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.saveAs = require('file-saver').saveAs;
    }
  }

  ngOnInit() {
    this.editorOptions = new JSONEditorOptions();
    this.editorOptions.modes = ['text', 'view', 'code'];
    this.editorOptions.mode = 'text';
  }

  @Input() set result(result: EndpointResponse) {
    this._result = result;
    if (this._result.body) {
      setTimeout(() => {
        this.editor.setMode(this.isJSON(result.body) ? 'view' : 'text');
        this.editor.setText(this._result.body);
      }, 10);
    }
  }

  statusColor(status: number) {
    return status >= 300 ? '#dc3545' : '#28a745';
  }

  saveFile() {
    if (this._result.body) {
      const isJSON = this.isJSON(this._result.body);
      this.saveAs(new Blob([this._result.body], { type: isJSON ? 'text/json' : 'text/plain'}),
      `caboodle-${new Date().toLocaleString()}.${isJSON ? 'json' : 'txt'}`);
    }
  }

  isJSON(data: string) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
}
