import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from '../models/models';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoading = true;
  public user: any = {};
  public type: string;
  public name: string;
  public code: string;

  public topics: Observable<Topic[]>;

  constructor(private router: Router, private auth: AuthService, private service: CoursesService) {
    this.auth.getAuthState().subscribe((user) => {
      this.user = user;
      this.auth.validateUserType(user.email).then(value => {
        this.type = value;
        this.isLoading = false;
      }).catch((err) => {
        this.type = err;
        this.isLoading = false;
      });
    });

    this.topics = service.getCourseTopics();
  }


  ngOnInit() {
  }


  public finalizeRegister() {
    this.isLoading = true;
    this.auth.updateCommons(this.name, this.code, this.user.uid).then(() => {
      this.isLoading = false;
    }).catch((err) => {
      console.error('error', err);
    });
  }

}
