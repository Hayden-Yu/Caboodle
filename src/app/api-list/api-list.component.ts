import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../data-class/category.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})


export class ApiListComponent implements OnInit {
  catDrop: any;
  filteredList: any;
  apiList: any = [  // convert to service?
    {'link': 'https://github.com/peruukki/nhl-score-api', 'catId': 0, 'name': 'NHL Scores'},
    {'link': 'https://github.com/dword4/nhlapi', 'catId': 0, 'name': 'NHL API'},
    {'link': 'https://api.football-data.org', 'catId': 0, 'name': 'Soccer API'},
    {'link': 'http://nflarrest.com/api/', 'catId': 0, 'name': 'NFL Arrests'},
    {'link': 'http://ufc-data-api.ufc.com/', 'catId': 0, 'name': 'UFC API'},
    {'link': 'https://www.census.gov/data/developers/data-sets.html', 'catId': 1, 'name': 'United States Census'},
    {'link': 'https://datausa.io/about/api', 'catId': 1, 'name': 'Data USA API'},
    {'link': 'https://search.data.gov.au/', 'catId': 1, 'name': 'Australia Data Portal'},
    {'link': 'https://open.canada.ca/en', 'catId': 1, 'name': 'Canada Open Government'},
    {'link': 'http://ratings.food.gov.uk/open-data/en-GB', 'catId': 1, 'name': 'UK Food Hygiene Rating API'},
    {'link': 'https://www.data.gov/', 'catId': 1, 'name': 'USA Open Data API'},
    {'link': 'https://thecatapi.com/docs.html', 'catId': 2, 'name': 'The Cat API'},
    {'link': 'https://dog.ceo/dog-api', 'catId': 2, 'name': 'The Dog API'},
  ];
  // Pagination values
  page: 1;


  constructor(private categories: CategoryService) { }

  ngOnInit() {
      this.catDrop = this.categories.getCategories();
      this.filteredList = this.getFilteredList();
  }

  getFilteredList() {
    return this.apiList.sort(function(a, b) {
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

  onAPISearchKeyup(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredList = this.apiList.filter((apiList) => {
      if (apiList.name.toLowerCase().includes(val)) {
        return true;
      }
    });
    console.log(this.filteredList);
  }
  onCategoryClick(id) {
    if (id === -1) {
      this.filteredList = this.getFilteredList();
    } else {
    this.filteredList = this.apiList.filter(apiList => {
      if (apiList.catId === id) {
        return true;
      }
      return false;
    });
    }
  }
}
