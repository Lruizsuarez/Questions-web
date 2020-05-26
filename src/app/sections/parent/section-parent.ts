import { ActivatedRoute } from '@angular/router';
import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { Photo, Section, HandledResponse, Question, Option } from './../../models/api.model';
import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export default class SectionParent implements OnInit {

  GENERIC_ERROR_EMPTY_STATE = './../../../assets/errors/mirage-come-back-later.png';

  protected cid: string;
  protected sid: string;
  protected focusedImage: Photo;
  protected $data: Observable<Section | any>;
  protected questions: Question[];
  protected sharedOptions: Option[];
  protected error: HandledResponse;

  submited_questions = 0;
  submited_shared_options = 0;


  constructor(protected flowStore: SectionCreationService, protected route: ActivatedRoute,
    protected max_questions: number, protected max_sharedOptions: number) {
    this.cid = route.snapshot.queryParams.cid;
    this.sid = flowStore.getSID() || route.snapshot.queryParams.sid;
  }


  ngOnInit() {
    if (this.sid) {
      this.fetchData();
    } else {
      this.questions = Array(this.max_questions).fill({});
      this.sharedOptions = Array(this.max_sharedOptions).fill({});
    }
  }

  fetchData() {
    this.$data = this.flowStore.getCurrentSection()
      .pipe(
        tap((section: Section) => {
          this.submited_questions = section.questions.length;
          this.submited_shared_options = section.sharedOptions.length;
          this.questions = (section.questions as Question[]).
            concat(Array(this.max_questions - section.questions.length).fill({}));
          this.sharedOptions = (section.sharedOptions as Option[])
            .concat(Array(this.max_sharedOptions - section.sharedOptions.length).fill({}));
        }),
        catchError((err: HandledResponse) => {
          this.error = err;
          return of();
        })
      );
  }


  handleContextImageClick(image: Photo) {
    this.focusedImage = image;
  }

  handlePerformedCreation(sid: string) {
    this.flowStore.saveSID(sid);
    this.sid = sid;
  }

  clearSID() {
    this.flowStore.clearSID();
  }

  handleSharedOptionCreation(request: Option) {
    return this.flowStore.addSharedOption(request);
  }

  handleSharedOptionUpdate(request: Option) {
    return this.flowStore.updateSharedOption(request);
  }

  updateOptionIndex(index: number, data: Option) {
    this.sharedOptions[index]._id = data._id;
    this.sharedOptions[index].text = data.text;
    this.sharedOptions[index].image = data.image;
  }

  handleQuestionCreation(request: Question) {
    return this.flowStore.addQuestion(request);
  }

  handleQuestionUpdate(request: Question) {
    return this.flowStore.updateQuestion(request);
  }

  updateQuestionIndex(index: number, data: Question) {
    this.questions[index]._id = data._id;
    this.questions[index].question = data.question;
    this.questions[index].options = data.options;
    this.questions[index].answer = data.answer;
  }
}
