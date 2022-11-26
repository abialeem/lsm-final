import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AddTopicComponent } from './components/add-topic/add-topic.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { AddchapterComponent } from './components/addchapter/addchapter.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { AddmadrasaComponent } from './components/addmadrasa/addmadrasa.component';
import { AddprincipalComponent } from './components/addprincipal/addprincipal.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { AddsubjectComponent } from './components/addsubject/addsubject.component';
import { AddteacherComponent } from './components/addteacher/addteacher.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { ApprovalstatusComponent } from './components/approvalstatus/approvalstatus.component';
import { CourselistComponent } from './components/courselist/courselist.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { EditcourseComponent } from './components/editcourse/editcourse.component';
import { EditmadrasaComponent } from './components/editmadrasa/editmadrasa.component';
import { EditprincipalComponent } from './components/editprincipal/editprincipal.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';
import { EditsubjectComponent } from './components/editsubject/editsubject.component';
import { EditteacherComponent } from './components/editteacher/editteacher.component';
import { FullcourseComponent } from './components/fullcourse/fullcourse.component';
import { LoginComponent } from './components/login/login.component';
import { MadrasasComponent } from './components/madrasas/madrasas.component';
import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { PrincipalsComponent } from './components/principals/principals.component';
import { ProfessordashboardComponent } from './components/professordashboard/professordashboard.component';
import { ProfessorlistComponent } from './components/professorlist/professorlist.component';
import { ProfessorprofileComponent } from './components/professorprofile/professorprofile.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';
import { SingleMadrasaComponent } from './components/single-madrasa/single-madrasa.component';
import { SingleQuizComponent } from './components/single-quiz/single-quiz.component';
import { SingleTopicComponent } from './components/single-topic/single-topic.component';
import { SingleVideoComponent } from './components/single-video/single-video.component';
import { SinglecourseComponent } from './components/singlecourse/singlecourse.component';
import { SingleprincipalComponent } from './components/singleprincipal/singleprincipal.component';
import { SinglestudentComponent } from './components/singlestudent/singlestudent.component';
import { SinglesubjectComponent } from './components/singlesubject/singlesubject.component';
import { SingleteacherComponent } from './components/singleteacher/singleteacher.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TopicsComponent } from './components/topics/topics.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { VideosComponent } from './components/videos/videos.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';

import { AdminGuard } from './guards/admin.guard';
import { ProfessorGuard } from './guards/professor.guard';
import { RouterGuard } from './guards/router.guard';
import { UserGuard } from './guards/user.guard';

 
const routes: Routes = [
  {path:'',component:WelcomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'registrationsuccess',component:RegistrationsuccessComponent},
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[AdminGuard]},
  {path:'userdashboard',component:UserdashboardComponent,canActivate:[UserGuard]},
  {path:'professordashboard',component:ProfessordashboardComponent,canActivate:[ProfessorGuard]},
   /*  admin routes starts here */
  {path:'allMadrasas',component:MadrasasComponent,canActivate:[AdminGuard]},
  {path:'addMadrasa',component:AddmadrasaComponent,canActivate:[AdminGuard]},
  {path:'editMadrasa/:id',component:EditmadrasaComponent,canActivate:[AdminGuard]},
  {path:'singleMadrasa/:id',component:SingleMadrasaComponent,canActivate:[AdminGuard]},
  {path:'allPrincipals',component:PrincipalsComponent,canActivate:[AdminGuard]},
  {path:'addPrincipal',component:AddprincipalComponent,canActivate:[AdminGuard]},
  {path:'editPrincipal/:id',component:EditprincipalComponent,canActivate:[AdminGuard]},
  {path:'singlePrincipal/:id',component:SingleprincipalComponent,canActivate:[AdminGuard]},
  //teacher routes starts here
  {path:'allTeachers',component:TeachersComponent,canActivate:[AdminGuard]},
  {path:'addTeacher',component:AddteacherComponent,canActivate:[AdminGuard]},
  {path:'editTeacher/:id',component:EditteacherComponent,canActivate:[AdminGuard]},
  {path:'singleTeacher/:id',component:SingleteacherComponent,canActivate:[AdminGuard]},
  //teacher routes ends here
  {path:'allCourses',component:CoursesComponent,canActivate:[AdminGuard]},
  {path:'addCourse',component:AddcourseComponent,canActivate:[AdminGuard]},
  {path:'editCourse/:id',component:EditcourseComponent,canActivate:[AdminGuard]},
  {path:'singleCourse/:id',component:SinglecourseComponent,canActivate:[AdminGuard]},
  {path:'allSubjects',component:SubjectsComponent,canActivate:[AdminGuard]},
  {path:'addSubject',component:AddsubjectComponent,canActivate:[AdminGuard]},
  {path:'editSubject/:id',component:EditsubjectComponent,canActivate:[AdminGuard]},
  {path:'singleSubject/:id',component:SinglesubjectComponent,canActivate:[AdminGuard]}, 
  //student routes starts here
  {path:'allStudents',component:StudentsComponent,canActivate:[AdminGuard]},
  {path:'addStudent',component:AddstudentComponent,canActivate:[AdminGuard]},
  {path:'editStudent/:id',component:EditstudentComponent,canActivate:[AdminGuard]},
  {path:'singleStudent/:id',component:SinglestudentComponent,canActivate:[AdminGuard]},
  //student routes ends here
  //topics routes starts here
  {path:'allTopics',component:TopicsComponent,canActivate:[AdminGuard]},
  {path:'addTopic',component:AddTopicComponent,canActivate:[AdminGuard]},
  {path:'editTopic/:id',component:EditTopicComponent,canActivate:[AdminGuard]},
  {path:'singleTopic/:id',component:SingleTopicComponent,canActivate:[AdminGuard]},
  //topic routes end here
  //video routes starts here
  {path:'allVideos',component:VideosComponent,canActivate:[AdminGuard]},
  {path:'addVideo',component:AddVideoComponent,canActivate:[AdminGuard]},
  {path:'editVideo/:id',component:EditVideoComponent,canActivate:[AdminGuard]},
  {path:'singleVideo/:id',component:SingleVideoComponent,canActivate:[AdminGuard]},
  //video routes ends here
  //quiz routes starts here
  {path:'allQuizzes',component:QuizzesComponent,canActivate:[AdminGuard]},
  {path:'addQuiz',component:AddQuizComponent,canActivate:[AdminGuard]},
  {path:'editQuiz/:id',component:EditQuizComponent,canActivate:[AdminGuard]},
  {path:'singleQuiz/:id',component:SingleQuizComponent,canActivate:[AdminGuard]},
  //quiz routes ends here
  /*  admin routes ends here */
  {path:'addCourse',component:AddcourseComponent,canActivate:[RouterGuard]},
  {path:'approveprofessor',component:ApprovalstatusComponent,canActivate:[RouterGuard]},
  {path:'professorlist',component:ProfessorlistComponent,canActivate:[RouterGuard]},
  {path:'userlist',component:UserlistComponent,canActivate:[RouterGuard]},
  {path:'courselist',component:CourselistComponent,canActivate:[RouterGuard]},
  {path:'addchapter',component:AddchapterComponent,canActivate:[RouterGuard]},
  {path:'fullcourse/:coursename',component:FullcourseComponent,canActivate:[RouterGuard]},
  {path:'editprofessorprofile',component:ProfessorprofileComponent,canActivate:[ProfessorGuard]},
  {path:'edituserprofile',component:UserprofileComponent,canActivate:[UserGuard]},
  {path:'mycourses',component:MycoursesComponent,canActivate:[RouterGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
