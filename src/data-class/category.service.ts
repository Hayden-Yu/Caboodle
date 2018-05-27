import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: any[] = [
    {'id': 0, 'name': 'Sports'},
    {'id': 1, 'name': 'Government'},
    {'id': 2, 'name': 'Animals'},
    {'id': 3, 'name': 'Finance'},
    {'id': 4, 'name': 'Developer'},
    {'id': 5, 'name': 'Food'},
    {'id': 6, 'name': 'Games'},
    {'id': 7, 'name': 'Geography'}
  ];

  constructor() { }
  // Eventually use an observable to get categories.
  getCategories() {
    return this.categories.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }
}
