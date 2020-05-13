import { SIMPLE_ACTION_TEXT } from './../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsService } from './../../services/questions/questions.service';
import { Option, Photo, HandledResponse } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relationship-option',
  templateUrl: './relationship-option.component.html',
  styleUrls: ['./relationship-option.component.css']
})
export class RelationshipOptionComponent implements OnInit {

  @Input() sectionId: string;
  @Input() data: Option;
  @Input() requiredImage: boolean;
  @Input() creationFlow: boolean;

  @Output() focusedImage: EventEmitter<Photo>;

  hasData = true;

  constructor(private options: QuestionsService, private snackBar: MatSnackBar) {
    this.focusedImage = new EventEmitter();
  }

  ngOnInit() {
    if (!this.data) {
      this.hasData = false;
      this.data = { _id: '', text: '' };
    }
  }

  saveImage(data: Photo) {
    this.data.image = data;
    this.hasData = !this.hasData;
  }

  focusImage() {
    this.focusedImage.emit(this.data.image);
  }

  editOption() {

  }

  saveOption() {
    this.options.postSharedOption(this.data, this.sectionId).subscribe((response: HandledResponse) => {
      this.showSuccessfullSnackBar(response.status);
      this.creationFlow = false;
    }, (err: HandledResponse) => {
      this.showErrorSnackBar(err.status);
    });
  }

  showSuccessfullSnackBar(text: string) {
    this.snackBar.open(text, null, { duration: 3000, panelClass: ['successfull-snackbar'] });
  }

  showErrorSnackBar(text: string) {
    this.snackBar.open(text, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
  }

}
