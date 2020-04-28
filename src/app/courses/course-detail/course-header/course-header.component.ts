import { Location } from '@angular/common';
import { SIMPLE_ACTION_TEXT } from 'src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from './../../../services/courses/courses.service';
import { Topic, HandledResponse } from './../../../models/api.model';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {

  @Input() id: string;
  @Input() topic: Topic;
  @Input() title: String;
  @Input() description: String;
  @Input() activeFlip: boolean;

  @Output() flip = new EventEmitter<void>();

  courseForm: FormGroup;
  isEditing = false;

  constructor(private builder: FormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
  }

  ngOnInit() {
    this.courseForm = this.builder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    });
  }

  setEditing() {
    this.isEditing = !this.isEditing;
    this.courseForm.patchValue({ title: this.title, description: this.description });
  }

  flipParent() {
    this.flip.emit();
  }

  updateCourse() {
    const request = { ...this.courseForm.value };
    this.coursesService.updateCourse(this.id, request).subscribe((res: HandledResponse) => {
      this.snackBar.open(res.status, null, { duration: 5000, panelClass: ['successfull-snackbar'] });
      this.title = this.courseForm.get('title').value;
      this.description = this.courseForm.get('description').value;
      this.setEditing();
    },
      (err: HandledResponse) => {
        this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
      });
  }

  deleteCourse() {
    this.coursesService.deleteCourse(this.id).subscribe(() => {
      this.location.back();
    }, (err: HandledResponse) => {
      this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
    });
  }

}
