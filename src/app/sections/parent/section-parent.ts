import { ActivatedRoute } from '@angular/router';
import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { Photo, Section, HandledResponse } from './../../models/api.model';
import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export default class SectionParent implements OnInit {

  GENERIC_ERROR_EMPTY_STATE = './../../../assets/errors/mirage-come-back-later.png';

  protected cid: string;
  protected sid: string;
  protected focusedImage: Photo;
  protected $data: Observable<Section | any>;
  protected error: HandledResponse;


  constructor(protected flowStore: SectionCreationService, protected route: ActivatedRoute) {
    this.cid = route.snapshot.queryParams.cid;
    this.sid = flowStore.getSID();
  }


  ngOnInit() {
    if (this.sid) {
      this.$data = this.flowStore.getCurrentSection()
        .pipe(
          catchError((err: any) => {
            this.error = err.error;
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
  }

  clearSID() {
    console.log('holaaaaaa');
    this.flowStore.clearSID();
  }
}
