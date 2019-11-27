import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
