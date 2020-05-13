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


  submited_questions = 0;
  submited_shared_options = 0;

  constructor(protected activatedRoute: ActivatedRoute,
    private router: Router,
    protected flow: SectionCreationService) {
    super(flow, activatedRoute , 5 , 8);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
