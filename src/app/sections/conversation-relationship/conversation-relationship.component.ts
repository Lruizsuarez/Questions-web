import { ActivatedRoute } from '@angular/router';
import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';

@Component({
  selector: 'app-conversation-relationship',
  templateUrl: './conversation-relationship.component.html',
  styleUrls: ['./conversation-relationship.component.css']
})
export class ConversationRelationshipComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 3;

  constructor(protected flow: SectionCreationService, activatedRoute: ActivatedRoute) {
    super(flow, activatedRoute, 5, 8);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
