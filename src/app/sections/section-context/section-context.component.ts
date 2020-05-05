import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Question, Photo } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-context',
  templateUrl: './section-context.component.html',
  styleUrls: ['./section-context.component.css']
})
export class SectionContextComponent implements OnInit {

  @Input() title: string;
  @Input() context: string;
  @Input() image: Photo;
  @Input() example: Question;
  @Input() contextMaxLength: number;

  @Output() clickedImage: EventEmitter<string>;

  sectionForm: FormGroup;
  isEditing = true;

  private id: string;

  constructor(private builder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.clickedImage = new EventEmitter();
    this.id = this.activatedRoute.snapshot.queryParams['sid'];
    if (this.id) {
      this.isEditing = false;
    }
  }

  ngOnInit() {
    this.sectionForm = this.builder.group({
      sectionTitle: [{ value: '', disabled: this.title }, [Validators.required]],
      sectionContext: [{ value: '', disabled: this.context }, [Validators.required]]
    });
  }

  saveImage(image: Photo) {
    this.image = image;
  }

  focusImage() {
    this.clickedImage.emit(this.image.content);
  }

}
