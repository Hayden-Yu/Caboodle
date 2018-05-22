import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: string[] = [
    'Sports',
    'Government',
    'Animals',
    'Finance',
    'Developer',
    'Food',
    'Games',
    'Geography'
  ];

  constructor() { }
  // Eventually use an observable to get categories.
  getCategories() {
    return this.categories;
  }
}
