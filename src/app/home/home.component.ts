import { UserService } from './../services/user/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/api.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoading = true;
  public user: Observable<User>;

  constructor(private userInfo: UserService) {
  }


  ngOnInit() {
    this.user = this.userInfo.currentUser;
  }

}
