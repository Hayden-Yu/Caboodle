import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../data-class/category.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  categoryList: any[];
  filteredList: any[];
  apiList: any[] = [];

  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.categoryList = this.category.getCategories();
    this.filteredList =  this.categoryList;
  }

  onCategorySearchKeyup(event: any){
    const val = event.target.value.toLowerCase();
    this.filteredList = this.categoryList.filter((categories) => {
      if (categories.toLowerCase().includes(val)) {
        return true;
      }
    });

  }

}
