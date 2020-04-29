import { User } from './../../../../models/api.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnChanges {

  @Input() list: User[];
  @Input() searchKeyword: string;
  @Input() sortKeyword: string;

  searchList: User[];

  searching: boolean;
  sorting: boolean;
  hover = false;

  NO_STUDENTS_EMPTY_STATE = './../../../../../assets/errors/flamenco-searching.png';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortKeyword && !changes.sortKeyword.firstChange) {
      this.sorting = true;
      this.performSort();
    } else if (changes.searchKeyword && !changes.searchKeyword.firstChange) {
      this.searching = true;
      this.performSearch();
    }
  }


  ngOnInit() { }


  performSort(): void {
    if (this.sortKeyword) {
      if (this.searching) {
        this.sortWithSearch();
      } else {
        this.simpleSort();
      }
    } else {
      this.sorting = false;
    }
  }

  simpleSort(): void {
    this.list = this.list.sort((a: User, b: User) => {
      switch (typeof a[this.sortKeyword]) {
        case 'string':
          if (this.sortKeyword === 'last_token_date') {
            return b[this.sortKeyword].toString().localeCompare(a[this.sortKeyword].toString());
          }
          return a[this.sortKeyword].localeCompare(b[this.sortKeyword]);
        case 'number':
          return a[this.sortKeyword] - b[this.sortKeyword];
        default:
      }
    });
  }

  sortWithSearch(): void {
    this.searchList = this.searchList.sort((a: User, b: User) => {
      switch (typeof a[this.sortKeyword]) {
        case 'string':
          if (this.sortKeyword === 'last_token_date') {
            return b[this.sortKeyword].toString().localeCompare(a[this.sortKeyword].toString());
          }
          return a[this.sortKeyword].localeCompare(b[this.sortKeyword]);
        case 'number':
          return a[this.sortKeyword] - b[this.sortKeyword];
        default:
      }
    });

  }

  performSearch(): void {
    if (this.searchKeyword) {
      this.searchList = this.list.filter((student: User) => student.user_name.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    } else {
      this.searching = false;
    }
  }

}
