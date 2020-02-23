import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../services/courses/courses.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @Input() user: any;


  constructor(private service: CoursesService) {
  }

  ngOnInit() {
  }

}
