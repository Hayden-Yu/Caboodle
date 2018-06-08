import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Collection } from '../common/models/collection';

@Component({
  selector: 'app-collection-endpoint-list',
  templateUrl: './collection-endpoint-list.component.html',
  styleUrls: ['./collection-endpoint-list.component.css']
})
export class CollectionEndpointListComponent implements OnInit {
  @Input() collections: Collection[];
  @Output() deleteCol: EventEmitter<number>;

  active: Collection;
  constructor() { }

  ngOnInit() {
    this.active = new Collection();
  }

  deleteCollection(id: number) {
    this.deleteCol.emit(id);
  }
}
