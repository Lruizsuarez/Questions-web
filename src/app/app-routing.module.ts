import { ExamCreationComponent } from './exams/exam-creation/exam-creation.component';
import { ExamsListComponent } from './exams/exams-list/exams-list.component';
import { SectionsListComponent } from './sections/sections-list/sections-list.component';
import { MultipleSelectionComponent } from './sections/multiple-selection/multiple-selection.component';
import { ReadingComprehensionComponent } from './sections/reading-comprehension/reading-comprehension.component';
import { ConversationRelationshipComponent } from './sections/conversation-relationship/conversation-relationship.component';
import { VocabularyIndentificationComponent } from './sections/vocabulary-indentification/vocabulary-indentification.component';
import { ImageRelationshipComponent } from './sections/image-relationship/image-relationship.component';
import { SectionPreviewComponent } from './sections/section-preview/section-preview.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseCreationComponent } from './topics/course-creation/course-creation.component';
import { CourseEnrollmentComponent } from './topics/course-enrollment/course-enrollment.component';

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
    path: 'section',
    children: [
      {
        path: 'list',
        component: SectionsListComponent,
      },
      {
        path: 'preview',
        component: SectionPreviewComponent,
      },
      {
        path: 'image-relationship',
        component: ImageRelationshipComponent,
      },
      {
        path: 'vocabulary-identification',
        component: VocabularyIndentificationComponent,
      },
      {
        path: 'conversation-relationship',
        component: ConversationRelationshipComponent,
      },
      {
        path: 'reading-comprehension',
        component: ReadingComprehensionComponent,
      },
      {
        path: 'multiple-selection',
        component: MultipleSelectionComponent,
      }
    ]
  }, {
    path: 'exam',
    children: [
      {
        path: 'list',
        component: ExamsListComponent
      }, {
        path: 'creation',
        component: ExamCreationComponent
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
