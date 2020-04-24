import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  @Output() flip = new EventEmitter<void>();

  constructor() {
    console.log('calling student component constructor');
  }

  ngOnInit() {
  }

  performFlip() {
    this.flip.emit();
  }

}
