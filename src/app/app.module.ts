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
import { AddprofessorComponent } from './components/addprofessor/addprofessor.component';
import { ApprovalstatusComponent } from './components/approvalstatus/approvalstatus.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ProfessorlistComponent } from './components/professorlist/professorlist.component';
import { CourselistComponent } from './components/courselist/courselist.component';
import { FullcourseComponent } from './components/fullcourse/fullcourse.component';
import { AddchapterComponent } from './components/addchapter/addchapter.component';
import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { MywishlistComponent } from './components/mywishlist/mywishlist.component';
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
    AddprofessorComponent,
    ApprovalstatusComponent,
    AddcourseComponent,
    UserlistComponent,
    ProfessorlistComponent,
    CourselistComponent,
    FullcourseComponent,
    AddchapterComponent,
    MycoursesComponent,
    MywishlistComponent,
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
    SinglestudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
