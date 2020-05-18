import { SIMPLE_ACTION_TEXT } from './../../utils/constants';
import { HandledResponse, Question } from './../../models/api.model';
import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';
import { Option } from 'src/app/models/api.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-relationship',
  templateUrl: './image-relationship.component.html',
  styleUrls: ['./image-relationship.component.css']
})
export class ImageRelationshipComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 1;
  showIndex = false;

  private currentQuestion: Question;
  private currentIdx: number;


  constructor(protected activatedRoute: ActivatedRoute,
    private router: Router,
    protected flow: SectionCreationService,
    private snackBar: MatSnackBar) {
    super(flow, activatedRoute, 5, 8);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  changeCurrRelationshipQuestion(data: Question, index: number) {
    if (!this.showIndex) {
      this.showIndex = true;
    }
    this.currentQuestion = data;
    this.currentIdx = index;
  }

  makeRelationAndSave(data: Option) {
    const opts = [{ _id: data._id, answer: true }];
    this.currentQuestion.options = opts;
    this.createQuestion(this.currentQuestion, this.currentIdx);
  }

  createSharedOption(request: Option, index: number) {
    this.handleSharedOptionCreation(request).subscribe((response: HandledResponse) => {
      request._id = response.additional_information.result_id;
      this.updateOptionIndex(index, request);
      this.submited_shared_options += 1;
      this.showSuccessfullSnackBar(response.status);
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  updateSharedOption(request: Option, index: number) {
    this.handleSharedOptionUpdate(request).subscribe((response: HandledResponse) => {
      this.updateOptionIndex(index, request);
      this.showSuccessfullSnackBar(response.status);
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  createQuestion(request: Question, index: number) {
    this.handleQuestionCreation(request).subscribe((response: HandledResponse) => {
      request._id = response.additional_information.result_id;
      this.updateQuestionIndex(index, request);
      this.submited_questions += 1;
      this.showIndex = false;
      this.showSuccessfullSnackBar(response.status);
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  updateQuestion(request: Question, index: number) {
    this.handleQuestionUpdate(request).subscribe((response: HandledResponse) => {
      this.updateQuestionIndex(index, request);
      this.showSuccessfullSnackBar(response.status);
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
