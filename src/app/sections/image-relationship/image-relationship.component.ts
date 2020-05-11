import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';

@Component({
  selector: 'app-image-relationship',
  templateUrl: './image-relationship.component.html',
  styleUrls: ['./image-relationship.component.css']
})
export class ImageRelationshipComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 1;
  max_questions = 5;
  max_shared_options = 8;


  submited_questions = 0;
  submited_shared_options = 0;

  constructor(protected activatedRoute: ActivatedRoute,
    private router: Router,
    protected flow: SectionCreationService) {
    super(flow, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  questionCounter() {
    return Array(this.max_questions);
  }

  optionCounter() {
    return Array(this.max_shared_options);
  }

  makeRelation(event: any) {
    console.log('drop event : ', event);
  }

}
