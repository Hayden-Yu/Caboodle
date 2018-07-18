import { EndpointResponse } from './../../common/models/endpoint-response';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { JsonEditorComponent, JSONEditorOptions } from '../../json-editor/json-editor.component';

@Component({
  selector: 'app-endpoint-result',
  templateUrl: './endpoint-result.component.html',
  styles: []
})
export class EndpointResultComponent implements OnInit {

  _result: EndpointResponse = new EndpointResponse();

  @ViewChild(JsonEditorComponent)
  private editor: JsonEditorComponent;
  editorOptions: JSONEditorOptions;
  constructor() { }

  ngOnInit() {
    this.editorOptions = new JSONEditorOptions();
    this.editorOptions.modes = ['text', 'view', 'code'];
    this.editorOptions.mode = 'text';
  }

  @Input() set result(result: EndpointResponse) {
    this._result = result;
    if (this._result.body) {
      setTimeout(() => {
        try {
          JSON.parse(result.body);
          this.editor.setMode('view');
        } catch (e) {
          this.editor.setMode('text');
        }
        this.editor.setText(this._result.body);
      }, 10);
    }
  }

  statusColor(status: number) {
    return status >= 300 ? '#dc3545' : '#28a745';
  }
}
