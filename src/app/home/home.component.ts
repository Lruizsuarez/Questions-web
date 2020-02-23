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
  }


  ngOnInit() {
  }

}
