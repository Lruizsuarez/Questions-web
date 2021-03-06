import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseEnrollmentComponent } from './courses/course-enrollment/course-enrollment.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseCreationComponent } from './topics/course-creation/course-creation.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  }, {
    path: 'course/:id/detail', component: CourseDetailComponent
  }, {
    path: 'topics',
    children: [
      {
        path: 'course-creation',
        component: CourseCreationComponent,
      }, {
        path: 'enrollment',
        component: CourseEnrollmentComponent
      }
    ]
  }, {
    path: '', pathMatch: 'full', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
