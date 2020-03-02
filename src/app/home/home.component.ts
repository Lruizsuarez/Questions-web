import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoading = true;
  public user: Observable<User>;

  constructor(private auth: AuthService) {
  }


  ngOnInit() {
    this.user = this.auth.currentUser;
  }

}
