import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../services/courses/courses.service';
@Component({
  selector: 'app-courses',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicsComponent implements OnInit {

  @Input() user: any;


  constructor(private service: CoursesService) {
  }

  ngOnInit() {
  }

}
