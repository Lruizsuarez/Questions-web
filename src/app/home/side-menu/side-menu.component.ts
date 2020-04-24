import { SIMPLE_ACTION_TEXT } from './../../utils/constants';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/api.model';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() user: Observable<User>;


  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  doLogout() {
    this.auth.callLogoutService().then(() => {
      this.router.navigate(['login']);
    }).catch((err) => {
      this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
    });
  }
}
