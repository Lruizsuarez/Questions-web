import { SectionInfo, SectionType, getSectionInfo } from './../../utils/enum-section.types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-preview',
  templateUrl: './section-preview.component.html',
  styleUrls: ['./section-preview.component.css']
})
export class SectionPreviewComponent implements OnInit {

  typesInfo: SectionInfo[];

  constructor() { }

  ngOnInit() {
    this.typesInfo = [];
    const values = Object.values(SectionType).filter(v => typeof v === 'number');
    values.forEach(value => this.typesInfo.push(getSectionInfo(value)));
  }

}
