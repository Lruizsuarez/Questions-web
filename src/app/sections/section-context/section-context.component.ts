import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Question } from './../../models/api.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-context',
  templateUrl: './section-context.component.html',
  styleUrls: ['./section-context.component.css']
})
export class SectionContextComponent implements OnInit {

  @Input() title: string;
  @Input() context: string;
  @Input() image: string;
  @Input() example: Question;
  @Input() contextMaxLength: number;

  sectionForm: FormGroup;
  isEditing = true;

  constructor(private builder: FormBuilder) {
    if (this.title) {
      this.isEditing = false;
    }
  }

  ngOnInit() {
    this.sectionForm = this.builder.group({
      sectionTitle: [{ value: '', disabled: this.title }, [Validators.required]],
      sectionContext: [{ value: '', disabled: this.context }, [Validators.required]]
    });
  }

}
