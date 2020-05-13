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



  constructor(protected flowStore: SectionCreationService, protected route: ActivatedRoute,
    protected max_questions: number, protected max_sharedOptions: number) {
    this.cid = route.snapshot.queryParams.cid;
    this.sid = flowStore.getSID();
    this.questions = Array(this.max_questions);
    this.sharedOptions = Array(this.max_sharedOptions);
  }


  ngOnInit() {
    if (this.sid) {
      this.$data = this.flowStore.getCurrentSection()
        .pipe(
          tap((section: Section) => {
            this.questions = (section.questions as Question[]).concat(Array(this.max_questions - section.questions.length));
            this.sharedOptions = (section.sharedOptions as Option[]).concat(Array(this.max_sharedOptions - section.sharedOptions.length));
          }),
          catchError((err: HandledResponse) => {
            this.error = err;
            return of();
          })
        );
    }
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
}
