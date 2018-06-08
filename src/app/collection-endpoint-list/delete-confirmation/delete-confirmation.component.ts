import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation',
  template: `
  <div class="modal-body">
    Do you want to remove this collection?
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close()">Remove</button>
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancel</button>
  </div>
  `,
  styles: []
})
export class CollectionEndpointListDeleteConfirmationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
