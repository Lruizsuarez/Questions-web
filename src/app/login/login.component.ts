import { AuthUserResponse, AuthRequest } from './../models/auth.models';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  LoginForm: FormGroup;

  constructor(private router: Router, private auth: AuthService, private builder: FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this.builder.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(konradlorenz)\.edu\.co$')]],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    this.isLoading = true;
    const request = this.LoginForm.value as AuthRequest;
    this.auth.callLoginService(request).then((userResponse: AuthUserResponse) => {
      // TODO: pass data betwwen services
      this.isLoading = false;
    }).catch((err) => {
      console.log(err);
    });
  }

}
