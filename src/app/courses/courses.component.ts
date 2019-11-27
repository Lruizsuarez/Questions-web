import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/models';
import { CoursesService } from '../services/courses/courses.service';
import { User } from 'firebase';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @Input() user: User;

  public topics: Observable<Topic[]>;

  constructor(private service: CoursesService) {
    this.topics = service.getCourseTopics();
  }

  ngOnInit() {
  }

}
