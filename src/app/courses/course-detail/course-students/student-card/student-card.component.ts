import { User } from './../../../../models/api.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnInit {

  @Input() student: User;
  @Input() searchKeyword: User;
  hover = false;

  constructor() { }

  ngOnInit() {
  }

  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }

}
