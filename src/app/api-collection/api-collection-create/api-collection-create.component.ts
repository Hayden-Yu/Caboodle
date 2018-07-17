import { Collection } from './../../common/models/collection';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CaboodleApiService } from './../../common/services/caboodle-api.service';
import { URL_REGEX } from './../../common/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Inject, PLATFORM_ID, Injector, EventEmitter } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-api-collection-create',
  templateUrl: './api-collection-create.component.html',
  styles: []
})
export class ApiCollectionCreateComponent implements OnInit {

  collectionForm: FormGroup;
  private activeModal: NgbActiveModal;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private apiService: CaboodleApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {
    if (isPlatformBrowser(platformId)) {
      this.activeModal = injector.get(NgbActiveModal, null);
    }
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    this.userService.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    });
    this.collectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      category: '',
      tag: '',
      website: ['', Validators.pattern(URL_REGEX)],
      description: '',
    });
  }

  submitForm() {
    if (this.collectionForm.invalid) {
      return;
    }
    this.apiService.createCollection({
      name: this.collectionForm.get('name').value.trim(),
      category: this.collectionForm.get('category').value,
      tag: this.collectionForm.get('tag').value,
      website: this.collectionForm.get('website').value,
      description: this.collectionForm.get('description').value
    })
    .subscribe(result => {
      if (this.activeModal) {
        this.activeModal.close(result);
      } else {
        this.router.navigate(['/collection', 'detail', result.id]);
      }
    });
  }

  invalidControl(formControlName: string): boolean {
    return this.collectionForm.get(formControlName).invalid
    && this.collectionForm.get(formControlName).touched;
  }
}
