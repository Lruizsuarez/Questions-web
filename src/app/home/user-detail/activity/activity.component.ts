import { HandledResponse } from './../../../models/api.model';
import { catchError } from 'rxjs/operators';
import { UserService } from './../../../services/user/user.service';
import { Activity } from '../../../models/api.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activity: Observable<Activity[] | any>;
  error: HandledResponse = null;
  GENERIC_ERROR_EMPTY_STATE = './../../../../../assets/errors/iconfinder_error_512541.png';

  constructor(private user: UserService) { }

  ngOnInit() {
    this.activity = this.user.getActivity().pipe(
      catchError((err: any) => {
        if (err.error.status) {
          this.error = err.error as HandledResponse;
          return of();
        }
      })
    );
  }


  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }


}
