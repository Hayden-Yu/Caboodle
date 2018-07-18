import { ApiCollectionCreateComponent } from './../../api-collection/api-collection-create/api-collection-create.component';
import { Collection } from './../../common/models/collection';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-collection',
  templateUrl: './select-collection.component.html',
  styles: []
})
export class SelectCollectionComponent implements OnInit {

  @ViewChild(ApiCollectionCreateComponent)
  private collectionCreate: ApiCollectionCreateComponent;
  @Output() selected: EventEmitter<number> = new EventEmitter();

  logger = console.log.bind(console);

  create = false;
  active: number;
  @Input() collections: Collection[];
  constructor(
  ) { }

  ngOnInit() {
    this.collectionCreate.collectionCreated.subscribe(e => this.newCollection(e));
  }

  newCollection($event: Collection) {
    console.log('ack');
    if (!this.collections) {
      this.collections = [];
    }
    this.collections.push($event);
    this.create = false;
    this.active = $event.id;
  }
}
