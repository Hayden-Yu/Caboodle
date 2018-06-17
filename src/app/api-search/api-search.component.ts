import { CaboodleApiService } from './../common/services/caboodle-api.service';
import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Category } from '../common/models/category';
import { Collection } from '../common/models/collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-search',
  templateUrl: './api-search.component.html',
  styleUrls: ['./api-search.component.css']
})
export class ApiSearchComponent implements OnInit {
  @Output() selectCollection: EventEmitter<Collection>;

  collections: Collection[];
  categories: Category[];
  selectedCategory: string;
  dropdown: boolean;

  query: string;
  private searchSub: Subscription;
  private queryTimer;
  constructor(private apiService: CaboodleApiService,
    private _elementRef: ElementRef) {
    this.selectCollection = new EventEmitter();
  }

  ngOnInit() {
    this.apiService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
    this.selectedCategory = 'All';
    this.dropdown = false;
  }

  updateCategory(category: string) {
    this.selectedCategory = category;
    this.retrieveSearchResult();
  }

  queryKeyup() {
    if (this.queryTimer) {
      clearTimeout(this.queryTimer);
    }
    this.queryTimer = setTimeout(this.retrieveSearchResult.bind(this), 400);
  }

  onSelect(collection: Collection) {
    this.selectCollection.emit(collection);
    this.dropdown = false;
  }

  retrieveSearchResult() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
    this.searchSub = this.apiService.getCollections(this.query, this.selectedCategory === 'All' ? '' : this.selectedCategory)
      .subscribe(res => {
        this.collections = res;
        this.dropdown = true;
      });
  }

  @HostListener('document:click', ['$event.target'])
  public onLick(targetElement) {
    if (!this._elementRef.nativeElement.contains(targetElement)) {
      this.dropdown = false; // hide dropdown when click outside
    }
  }
}

