import { Component, OnInit } from '@angular/core';
import SectionParent from '../parent/section-parent';
import { SectionCreationService } from 'src/app/services/section-creation/section-creation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multiple-selection',
  templateUrl: './multiple-selection.component.html',
  styleUrls: ['./multiple-selection.component.css']
})
export class MultipleSelectionComponent extends SectionParent implements OnInit {

  SECTION_TYPE = 5;

  constructor(protected flow: SectionCreationService, protected activatedRoute: ActivatedRoute) {
    super(flow, activatedRoute, 5, 0);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
