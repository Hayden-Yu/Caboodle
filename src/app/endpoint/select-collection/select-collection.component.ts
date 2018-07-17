import { Collection } from './../../common/models/collection';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-select-collection',
  templateUrl: './select-collection.component.html',
  styles: []
})
export class SelectCollectionComponent implements OnInit {

  @Output() selected: EventEmitter<number> = new EventEmitter();

  create = false;
  active: number;
  @Input() collections: Collection[];
  constructor(
  ) { }

  ngOnInit() {
  }

  newCollection(collection: Collection) {
    if (!this.collections) {
      this.collections = [];
    }
    this.collections.push(collection);
  }
}
