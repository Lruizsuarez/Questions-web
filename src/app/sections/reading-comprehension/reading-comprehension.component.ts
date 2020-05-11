import { SectionCreationService } from './../../services/section-creation/section-creation.service';
import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reading-comprehension',
  templateUrl: './reading-comprehension.component.html',
  styleUrls: ['./reading-comprehension.component.css']
})
export class ReadingComprehensionComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 4;

  constructor(protected flow: SectionCreationService, protected activatedRoute: ActivatedRoute) {
    super(flow, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
