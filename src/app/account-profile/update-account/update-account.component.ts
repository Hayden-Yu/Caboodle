import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-account',
  template: `
    <div class="modal-header">
      <h6>Account Info</h6>
    </div>
    <div class="modal-body">
    <div class="container-fluid">
      <div class="row form-group">
        <div class="col-md-2">
          <label>Email:</label>
        </div>
        <div class="col-md-6 col-lg-5">
          <input type="text" class="form-control" placeholder="Email Address" [(ngModel)]="email" disabled>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-2">
          <label>First Name:</label>
        </div>
        <div class="col-md-4 col-lg-3">
          <input type="text" class="form-control" placeholder="First Name" [(ngModel)]="firstName">
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-2">
          <label>Last Name:</label>
        </div>
        <div class="col-md-4 col-lg-3">
          <input type="text" class="form-control" placeholder="Last Name" [(ngModel)]="lastName">
        </div>
      </div>
    </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline-primary" (click)="update()">Save</button>
      <button class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancel</button>
    </div>
  `,
  styles: []
})
export class UpdateAccountComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  update() {
    this.activeModal.close({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
}
