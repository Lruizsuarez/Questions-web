import { ErrorResponse } from './../models/error.model';
import { AuthRequest } from './../models/auth.models';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SIMPLE_ACTION_TEXT } from '../utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  LoginForm: FormGroup;

  constructor(private router: Router, private auth: AuthService, private builder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.LoginForm = this.builder.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(konradlorenz)\.edu\.co$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  doLogin() {
    this.isLoading = true;
    const request = this.LoginForm.value as AuthRequest;
    this.auth.callLoginService(request).then(() => {
      this.router.navigate(['/home']);
      this.isLoading = false;
    }).catch((err: ErrorResponse) => {
      this.isLoading = false;
      this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000 });
    });
  }

  public get f() {
    return this.LoginForm.controls;
  }

}
