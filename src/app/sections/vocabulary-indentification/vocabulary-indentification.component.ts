import { SIMPLE_ACTION_TEXT } from './../../utils/constants';
import { Question, HandledResponse } from './../../models/api.model';
import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vocabulary-indentification',
  templateUrl: './vocabulary-indentification.component.html',
  styleUrls: ['./vocabulary-indentification.component.css']
})
export class VocabularyIndentificationComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 2;
  max_options = 3;

  constructor(protected flow: SectionCreationService, protected activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {
    super(flow, activatedRoute, 5, 0);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createQuestion(request: Question) {
    this.handleQuestionCreation(request).subscribe((response: HandledResponse) => {
      request._id = response.additional_information.result_id;
      this.submited_questions += 1;
      this.showSuccessfullSnackBar(response.status);
      this.fetchData();
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  updateQuestion(request: Question) {
    this.handleQuestionUpdate(request).subscribe((response: HandledResponse) => {
      this.showSuccessfullSnackBar(response.status);
      this.fetchData();
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  showSuccessfullSnackBar(text: string) {
    this.snackBar.open(text, null, { duration: 3000, panelClass: ['successfull-snackbar'] });
  }

  showErrorSnackBar(text: string) {
    this.snackBar.open(text, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
  }
}
