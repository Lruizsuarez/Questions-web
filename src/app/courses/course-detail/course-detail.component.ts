import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  animations: [
    trigger('flipState', [
      state('students', style({
        transform: 'rotateY(180deg)'
      })),
      state('summary', style({
        transform: 'rotateY(0)'
      })),
      transition('summary => students', animate('500ms ease-out')),
      transition('students => summary', animate('500ms ease-in'))
    ])
  ]
})
export class CourseDetailComponent implements OnInit {

  constructor() { }

  flip = 'summary';

  ngOnInit() {
  }

  toggleFlip() {
    this.flip = (this.flip === 'students') ? 'summary' : 'students';
  }
}
