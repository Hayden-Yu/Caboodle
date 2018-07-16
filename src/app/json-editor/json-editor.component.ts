import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import JSONEditor, { JSONEditorOptions as IJSONEditorOptions, JSONEditorMode, JSONEditorNode } from 'jsoneditor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'json-editor',
  template: `
    <div #jsonEditor></div>
  `,
  styles: []
})
export class JsonEditorComponent implements OnInit {

  private editor: any;

  @ViewChild('jsonEditor') jsonEditorContainer: ElementRef;

  @Input() options: JSONEditorOptions = new JSONEditorOptions();
  @Input() data: Object = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = new JSONEditor(this.jsonEditorContainer.nativeElement, this.options, this.data);
    }
  }

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get(): JSON {
    return this.editor.get();
  }

  public getMode(): JSONEditorMode {
    return this.editor.getMode() as JSONEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JSONEditorMode) {
    this.editor.setMode(mode);
  }

  public setText(text: string) {
    this.editor.setText(text);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public setOptions(newOptions: JSONEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.options = newOptions;
    this.ngOnInit();
  }

  public destroy() {
    this.editor.destroy();
  }

}

export class JSONEditorOptions implements IJSONEditorOptions {
  ace?: AceAjax.Ace;
  ajv?: any;
  onChange?: () => void;
  onEditable?: (node: JSONEditorNode) => boolean | {field: boolean, value: boolean};
  onError?: (error: Error) => void;
  onModeChange?: (newMode: JSONEditorMode, oldMode: JSONEditorMode) => void;
  escapeUnicode?: boolean;
  sortObjectKeys?: boolean;
  history?: boolean;
  mode?: JSONEditorMode;
  modes?: Array<JSONEditorMode>;
  name?: string;
  schema?: Object;
  search?: boolean;
  indentation?: number;
  theme?: string;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }
}
