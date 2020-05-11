import { Photo } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() type: string;
  @Input() icon: string;
  @Input() text: string;

  @Output() fileTransformed: EventEmitter<Photo>;

  private reader: FileReader;
  percentage: number;
  processedFile: Photo;


  constructor() {
    this.percentage = 0;
    this.reader = new FileReader();
    this.fileTransformed = new EventEmitter();
  }

  ngOnInit() {
    this.reader.onload = (event: ProgressEvent) => {
      this.percentage = event.loaded * 100 / event.total;
      this.processedFile.content = this.reader.result as string;
    };

    this.reader.onloadend = () => {
      this.processedFile.content = this.processedFile.content.split(',')[1];
      this.fileTransformed.emit(this.processedFile);
    };
  }

  performUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processedFile = { content_type: file.type };
      this.reader.readAsDataURL(file);
    }
  }

}
