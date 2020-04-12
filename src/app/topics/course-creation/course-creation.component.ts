import { User } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.css']
})
export class CourseCreationComponent implements OnInit {


  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.callUserInformation().subscribe((user: User) => this.user = user);
  }


  getPhoto(): string {
    if (this.user.photo) {
      return `data:image/png;base64,${this.user.photo}`;
    } else {
      return 'https://www.w3schools.com/howto/img_avatar.png';
    }
  }

}
