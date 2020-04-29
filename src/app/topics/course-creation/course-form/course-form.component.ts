import { GOTO_HOME_ACTION_TEXT } from './../../../utils/constants';
import { HandledResponse } from './../../../models/api.model';
import { CoursesService } from './../../../services/courses/courses.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SIMPLE_ACTION_TEXT } from 'src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() email: string;
  @Input() code: string;

  isLoading = false;
  courseForm: FormGroup;

  constructor(private location: Location,
    private builder: FormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.courseForm = this.builder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    });
  }

  createCourse() {
    this.isLoading = true;
    const request = { ...this.courseForm.value };
    this.coursesService.postCourse(request).subscribe((res: HandledResponse) => {
      this.isLoading = false;
      const ref = this.snackBar.open(res.status, GOTO_HOME_ACTION_TEXT, { duration: 10000, panelClass: ['successfull-snackbar'] });
      ref.onAction().subscribe(() => {
        this.location.back();
      });
    },
      (err: HandledResponse) => {
        this.isLoading = false;
        this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
      });
  }



}
