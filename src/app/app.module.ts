import { CourseEnrollmentComponent } from './topics/course-enrollment/course-enrollment.component';
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
import { CourseListComponent } from './home/user-detail/courses/course-list/course-list.component';
import { CourseFormComponent } from './topics/course-creation/course-form/course-form.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseSummaryComponent } from './courses/course-detail/course-summary/course-summary.component';
import { CourseStudentsComponent } from './courses/course-detail/course-students/course-students.component';
import { CourseHeaderComponent } from './courses/course-detail/course-header/course-header.component';
import { ShadowCardComponent } from './courses/course-detail/course-summary/shadow-card/shadow-card.component';
import { HighlightPipe } from './utils/highlight/highlight.pipe';
import { MatSelectModule } from '@angular/material/select';
import { StudentsListComponent } from './courses/course-detail/course-students/students-list/students-list.component';
import { StudentCardComponent } from './courses/course-detail/course-students/student-card/student-card.component';
import { SectionPreviewComponent } from './sections/section-preview/section-preview.component';
import { MatChipsModule } from '@angular/material/chips';
import { ImageRelationshipComponent } from './sections/image-relationship/image-relationship.component';
import { VocabularyIndentificationComponent } from './sections/vocabulary-indentification/vocabulary-indentification.component';
import { ConversationRelationshipComponent } from './sections/conversation-relationship/conversation-relationship.component';
import { ReadingComprehensionComponent } from './sections/reading-comprehension/reading-comprehension.component';
import { MultipleSelectionComponent } from './sections/multiple-selection/multiple-selection.component';
import { SectionContextComponent } from './sections/section-context/section-context.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { ImageFocusComponent } from './shared/image-focus/image-focus.component';
import { RelationshipQuestionComponent } from './shared/relationship-question/relationship-question.component';
import { RelationshipOptionComponent } from './shared/relationship-option/relationship-option.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MultipleSelectionListComponent } from './shared/multiple-selection-list/multiple-selection-list.component';
import { MultipleSelectionQuestionComponent } from './shared/multiple-selection-question/multiple-selection-question.component';
import { SectionsListComponent } from './sections/sections-list/sections-list.component';
import { ExamsListComponent } from './exams/exams-list/exams-list.component';
import { ExamCreationComponent } from './exams/exam-creation/exam-creation.component';



@NgModule({
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
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    DragDropModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideMenuComponent,
    CoursesComponent,
    UserDetailComponent,
    ActivityComponent,
    CourseListComponent,
    CourseCreationComponent,
    CourseFormComponent,
    CourseDetailComponent,
    CourseSummaryComponent,
    CourseStudentsComponent,
    CourseHeaderComponent,
    ShadowCardComponent,
    StudentsListComponent,
    StudentCardComponent,
    CourseEnrollmentComponent,
    SectionPreviewComponent,
    HighlightPipe,
    ImageRelationshipComponent,
    VocabularyIndentificationComponent,
    ConversationRelationshipComponent,
    ReadingComprehensionComponent,
    MultipleSelectionComponent,
    SectionContextComponent,
    FileUploadComponent,
    ImageFocusComponent,
    RelationshipQuestionComponent,
    RelationshipOptionComponent,
    MultipleSelectionListComponent,
    MultipleSelectionQuestionComponent,
    SectionsListComponent,
    ExamsListComponent,
    ExamCreationComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: STORAGE_SERVICE, useExisting: SESSION_STORAGE },
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
