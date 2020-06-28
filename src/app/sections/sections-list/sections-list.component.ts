import { HandledResponse } from 'src/app/models/api.model';
import { ActivatedRoute } from '@angular/router';
import { Section } from './../../models/api.model';
import { Observable, of } from 'rxjs';
import { CoursesService } from './../../services/courses/courses.service';
import { Component, OnInit } from '@angular/core';
import { getSectionInfo } from 'src/app/utils/enum-section.types';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.css']
})
export class SectionsListComponent implements OnInit {

  $sections: Observable<Section[] | any>;
  cid: string;
  sectionList: Section[];
  searchList: Section[];
  isSearching = false;
  searchKeyWord = '';
  error: HandledResponse;

  constructor(private course: CoursesService, private activeRoute: ActivatedRoute) {
    this.cid = this.activeRoute.snapshot.queryParams['cid'];
  }

  ngOnInit() {
    this.$sections = this.course.getCourseSections(this.cid)
      .pipe(map((data) => {
        this.sectionList = data;
        return data;
      }),
        catchError((err) => {
          this.error = err;
          return of();
        }));
  }

  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }

  getSectionTitle(type: number) {
    return getSectionInfo(type).title;
  }

  getSectionRoute(type: number) {
    return getSectionInfo(type).route;
  }

  search(event: any) {
    this.searchKeyWord = event.target.value;
    if (this.searchKeyWord.length > 0) {
      this.searchList = this.sectionList.filter((section: Section) =>
        section.title.toLowerCase().includes(this.searchKeyWord.toLowerCase()));
      this.isSearching = true;
    } else {
      this.isSearching = false;
    }

  }

}
