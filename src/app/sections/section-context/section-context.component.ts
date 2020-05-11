import { Location } from '@angular/common';
import { SectionsService } from './../../services/sections/sections.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Question, Photo, HandledResponse } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SIMPLE_ACTION_TEXT } from 'src/app/utils/constants';

@Component({
  selector: 'app-section-context',
  templateUrl: './section-context.component.html',
  styleUrls: ['./section-context.component.css']
})
export class SectionContextComponent implements OnInit {

  @Input() sectionType: number;
  @Input() courseId: string;
  @Input() sectionId: string;
  @Input() title: string;
  @Input() context: string;
  @Input() image: Photo;
  @Input() example: Question;
  @Input() contextMaxLength: number;

  @Output() clickedImage: EventEmitter<Photo>;
  @Output() performedCreation: EventEmitter<string>;
  @Output() performedDeletion: EventEmitter<void>;

  sectionForm: FormGroup;
  isEditing = true;

  constructor(private builder: FormBuilder,
    private section: SectionsService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.clickedImage = new EventEmitter();
    this.performedCreation = new EventEmitter();
    this.performedDeletion = new EventEmitter();
    if (this.sectionId) {
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

    if (!this.isEditing) {
      this.setEditing();
    }
  }


  focusImage() {
    this.clickedImage.emit(this.image);
  }


  setEditing() {
    this.isEditing = !this.isEditing;

    if (this.sectionForm.disabled) {
      this.sectionForm.enable();
    } else {
      this.sectionForm.disable();
    }
  }


  saveSection() {
    if (!this.sectionId) {
      this.performNewSave();
    } else {
      this.performUpdate();
    }
  }


  navigateToExample() {
    if (this.example) {
      // TODO : navigate with params to view example
    } else {
      // TODO : navigate without params for create example
    }
  }


  performNewSave() {
    if (this.sectionForm.invalid) {
      this.showError('invalid values for save', true);
      return;
    }
    const request = {
      type: this.sectionType,
      title: this.sectionForm.get('sectionTitle').value,
      context: this.sectionForm.get('sectionContext').value,
      image: this.image
    };

    this.section.postSection(request, this.courseId).subscribe((res: HandledResponse) => {
      this.showSuccessfullSnackBar(res.status);
      this.title = request.title;
      this.context = request.context;
      this.sectionId = res.additional_information._id;
      this.setEditing();
      this.performedCreation.emit(this.sectionId);
    }, (err: HandledResponse) => this.showError(err.status, false));
  }


  performUpdate() {
    if (this.sectionForm.invalid) {
      this.showError('invalid values for save', true);
      return;
    }

    const request = {
      type: this.sectionType,
      title: this.sectionForm.get('sectionTitle').value,
      context: this.sectionForm.get('sectionContext').value,
      image: this.image
    };

    this.section.updateSection(request, this.sectionId).subscribe((res: HandledResponse) => {
      this.showSuccessfullSnackBar(res.status);
      this.setEditing();
    }, (err: HandledResponse) => this.showError(err.status, true));
  }


  delete() {
    // TODO : add dialog confirmation befare delete 😘
    this.section.deleteSection(this.sectionId).subscribe(() => {
      this.location.back();
      this.performedDeletion.emit();
    }, (err: HandledResponse) => this.showError(err.status, true));
  }


  showError(text: string, markFields: boolean) {
    this.snackBar.open(text, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });

    if (markFields) {
      this.sectionForm.controls['sectionTitle'].markAsTouched();
      this.sectionForm.controls['sectionContext'].markAsTouched();
    }
  }


  showSuccessfullSnackBar(text: string) {
    this.snackBar.open(text, null, { duration: 3000, panelClass: ['successfull-snackbar'] });
  }

}
