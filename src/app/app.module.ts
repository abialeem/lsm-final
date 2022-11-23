import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { ProfessordashboardComponent } from './components/professordashboard/professordashboard.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ProfessorprofileComponent } from './components/professorprofile/professorprofile.component';
import { ApprovalstatusComponent } from './components/approvalstatus/approvalstatus.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ProfessorlistComponent } from './components/professorlist/professorlist.component';
import { CourselistComponent } from './components/courselist/courselist.component';
import { FullcourseComponent } from './components/fullcourse/fullcourse.component';
import { AddchapterComponent } from './components/addchapter/addchapter.component';
import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MadrasasComponent } from './components/madrasas/madrasas.component';
import { AddmadrasaComponent } from './components/addmadrasa/addmadrasa.component';
import { EditmadrasaComponent } from './components/editmadrasa/editmadrasa.component';
import { PrincipalsComponent } from './components/principals/principals.component';
import { AddprincipalComponent } from './components/addprincipal/addprincipal.component';
import { EditprincipalComponent } from './components/editprincipal/editprincipal.component';
import { EditteacherComponent } from './components/editteacher/editteacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddteacherComponent } from './components/addteacher/addteacher.component';
import { EditcourseComponent } from './components/editcourse/editcourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AddsubjectComponent } from './components/addsubject/addsubject.component';
import { EditsubjectComponent } from './components/editsubject/editsubject.component';
import { SingleprincipalComponent } from './components/singleprincipal/singleprincipal.component';
import { SingleteacherComponent } from './components/singleteacher/singleteacher.component';
import { SinglecourseComponent } from './components/singlecourse/singlecourse.component';
import { SinglesubjectComponent } from './components/singlesubject/singlesubject.component';
import { StudentsComponent } from './components/students/students.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';
import { SinglestudentComponent } from './components/singlestudent/singlestudent.component';
import { DataTablesModule } from 'angular-datatables';
import { TopicsComponent } from './components/topics/topics.component';
import { AddTopicComponent } from './components/add-topic/add-topic.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { SingleTopicComponent } from './components/single-topic/single-topic.component';
import { VideosComponent } from './components/videos/videos.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { SingleVideoComponent } from './components/single-video/single-video.component';
import { SingleQuizComponent } from './components/single-quiz/single-quiz.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { SingleMadrasaComponent } from './components/single-madrasa/single-madrasa.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationsuccessComponent,
    UserdashboardComponent,
    ProfessordashboardComponent,
    AdmindashboardComponent,
    HeaderComponent,
    FooterComponent,
    UserprofileComponent,
    ProfessorprofileComponent,
    ApprovalstatusComponent,
    AddcourseComponent,
    UserlistComponent,
    ProfessorlistComponent,
    CourselistComponent,
    FullcourseComponent,
    AddchapterComponent,
    MycoursesComponent,
    WelcomepageComponent,
    MadrasasComponent,
    AddmadrasaComponent,
    EditmadrasaComponent,
    PrincipalsComponent,
    AddprincipalComponent,
    EditprincipalComponent,
    EditteacherComponent,
    TeachersComponent,
    AddteacherComponent,
    EditcourseComponent,
    CoursesComponent,
    SubjectsComponent,
    AddsubjectComponent,
    EditsubjectComponent,
    SingleprincipalComponent,
    SingleteacherComponent,
    SinglecourseComponent,
    SinglesubjectComponent,
    StudentsComponent,
    AddstudentComponent,
    EditstudentComponent,
    SinglestudentComponent,
    TopicsComponent,
    AddTopicComponent,
    EditTopicComponent,
    SingleTopicComponent,
    VideosComponent,
    AddVideoComponent,
    EditVideoComponent,
    SingleVideoComponent,
    SingleQuizComponent,
    EditQuizComponent,
    AddQuizComponent,
    QuizzesComponent,
    SingleMadrasaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    YouTubePlayerModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
