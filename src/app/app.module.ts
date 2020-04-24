import { CourseCreationComponent } from './topics/course-creation/course-creation.component';
import { STORAGE_SERVICE, SessionStorageService } from './services/storage/session.storage.service';
import { AuthInterceptor } from './helpers/AuthInterceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SideMenuComponent } from './home/side-menu/side-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SESSION_STORAGE } from 'ngx-webstorage-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoursesComponent } from './home/user-detail/courses/courses.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';
import { ActivityComponent } from './home/user-detail/activity/activity.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseEnrollmentComponent } from './courses/course-enrollment/course-enrollment.component';
import { CourseListComponent } from './home/user-detail/courses/course-list/course-list.component';
import { CourseFormComponent } from './topics/course-creation/course-form/course-form.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseSummaryComponent } from './courses/course-detail/course-summary/course-summary.component';
import { CourseStudentsComponent } from './courses/course-detail/course-students/course-students.component';
import { CourseHeaderComponent } from './courses/course-detail/course-header/course-header.component';
import { ShadowCardComponent } from './courses/course-detail/course-summary/shadow-card/shadow-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideMenuComponent,
    CoursesComponent,
    UserDetailComponent,
    ActivityComponent,
    CourseEnrollmentComponent,
    CourseListComponent,
    CourseCreationComponent,
    CourseFormComponent,
    CourseDetailComponent,
    CourseSummaryComponent,
    CourseStudentsComponent,
    CourseHeaderComponent,
    ShadowCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: STORAGE_SERVICE, useExisting: SESSION_STORAGE },
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
