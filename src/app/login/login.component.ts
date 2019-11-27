import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msIcon = faWindows;
  isLoading = false;

  constructor(private router: Router, private auth: AuthService, public ngZone: NgZone) { }

  ngOnInit() {
  }

  doLogin() {
    this.isLoading = true;
    this.auth.doMicrosoftAuth().then(() => {
      this.router.navigate(['home']);
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

}
