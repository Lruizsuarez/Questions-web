import { QuestionsService } from './../questions/questions.service';
import { Option, HandledResponse, Section, Question } from './../../models/api.model';
import { SessionStorageService } from './../storage/session.storage.service';
import { SectionsService } from './../sections/sections.service';
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionCreationService {

  private SECTION_ID_KEY = 'SID';

  private currentId: string;

  constructor(private storage: SessionStorageService, private section: SectionsService, private questions: QuestionsService) {
    if (this.storage.hasKey(this.SECTION_ID_KEY)) {
      this.currentId = this.storage.get(this.SECTION_ID_KEY);
    }
  }

  getCurrentSection(): Observable<Section> {
    return this.section.getSection(this.currentId);
  }


  saveSID(sid: string): void {
    this.storage.store(this.SECTION_ID_KEY, sid);
    this.currentId = sid;
  }

  getSID(): string {
    return this.currentId;
  }

  clearSID(): void {
    this.storage.remove(this.SECTION_ID_KEY);
    this.currentId = null;
  }

  addSharedOption(option: Option): Observable<HandledResponse> {
    let resultId = '';
    return this.questions.postSharedOption(option, this.currentId).pipe(
      map((response: HandledResponse) => {
        resultId = response.additional_information.result_id;
        return this.section.patchSharedOption(this.currentId, resultId);
      }),
      flatMap((value: Observable<HandledResponse>) => value.pipe(map((response: HandledResponse) => {
        response.additional_information.result_id = resultId;
        return response;
      })))
    );
  }

  updateSharedOption(option: Option): Observable<HandledResponse> {
    return this.questions.updateOption(option, option._id);
  }

  addQuestion(question: Question): Observable<HandledResponse> {
    return this.questions.postQuestion(question, this.currentId);
  }

  updateQuestion(question: Question): Observable<HandledResponse> {
    return this.questions.updateQuestion(question, question._id);
  }

}
