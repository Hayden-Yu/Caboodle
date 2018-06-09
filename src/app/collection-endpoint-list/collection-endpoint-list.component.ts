import { CollectionEndpointListDeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { Collection } from '../common/models/collection';

@Component({
  selector: 'app-collection-endpoint-list',
  templateUrl: './collection-endpoint-list.component.html',
  styleUrls: ['./collection-endpoint-list.component.css']
})
export class CollectionEndpointListComponent implements OnInit {
  @Input() collections: Collection[];
  @Input() needDeleteCol = false;
  @Output() deleteCol: EventEmitter<number>;

  active: Collection;
  private modal: NgbModal;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.modal = this.injector.get(NgbModal);
    }
    this.deleteCol = new EventEmitter();
  }

  ngOnInit() {
    this.active = new Collection();
  }

  deleteCollection(id: number) {
    this.modal.open(CollectionEndpointListDeleteConfirmationComponent).result
    .then(() => {
      this.deleteCol.emit(id);
      this.active = new Collection();
    })
    .catch(() => {});
  }
}
