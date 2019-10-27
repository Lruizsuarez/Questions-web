import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msIcon = faWindows;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  doLogin() {
    this.auth.doMicrosoftAuth();
  }

}
