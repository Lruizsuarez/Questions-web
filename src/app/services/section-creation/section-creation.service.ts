import { SessionStorageService } from './../storage/session.storage.service';
import { SectionsService } from './../sections/sections.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionCreationService {

  private SECTION_ID_KEY = 'SID';

  private currentId: string;

  constructor(private storage: SessionStorageService, private section: SectionsService) {
    if (this.storage.hasKey(this.SECTION_ID_KEY)) {
      this.currentId = this.storage.get(this.SECTION_ID_KEY);
    }
  }

  getCurrentSection() {
    return this.section.getSection(this.currentId);
  }


  saveSID(sid: string) {
    this.storage.store(this.SECTION_ID_KEY, sid);
    this.currentId = sid;
  }

  getSID() {
    return this.currentId;
  }

  clearSID() {
    console.log('clearing');
    this.storage.remove(this.SECTION_ID_KEY);
    this.currentId = null;
  }

  addSharedOption(optionId: string) {
    return this.section.patchSharedOption(this.currentId, optionId);
  }

  addSectionQuestion(questionId: string) {
    return this.section.patchQuestion(this.currentId, questionId);
  }
}
