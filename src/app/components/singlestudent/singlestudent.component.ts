import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Madrasa } from 'src/app/models/madrasa';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-singlestudent',
  templateUrl: './singlestudent.component.html',
  styleUrls: ['./singlestudent.component.css']
})
export class SinglestudentComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  student = new Student();
  user_student = new User();
  current_student_id : any = '';

  student_course = new Course();
  student_madrasa = new Madrasa();
 
  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }


  ngOnInit(): void {

    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');

    if(this.currRole === "ADMIN"){
      this.current_student_id = this.activatedRoute.snapshot.paramMap.get("id");

      this.admin.getSingleStudent(this.current_student_id).subscribe(
        (res: any) => {
        //console.log(res);
         this.student= res['data'][0];
         //console.log(this.student);
                //get the student course and madrasa if any
                this.admin.getSingleMadrasa(this.student.madrasa_id).subscribe(
                  (res: any) => {
                  //console.log(res);
                   this.student_madrasa= res['data'][0];
                   //console.log(this.student_madrasa);
                   },
                 (err) => {
                   //console.log(err);
                    }
                     );
                //get student course
                this.admin.getSingleCourse(this.student.course_id).subscribe(
                  (res: any) => {
                  //console.log(res);
                   this.student_course= res['data'][0];
                   //console.log(this.student_course);
                   },
                 (err) => {
                   //console.log(err);
                    }
                     );
                  //get student user
                  this.admin.getSingleUser(this.student.user_id).subscribe(
                    (res: any) => {
                       //console.log(res);
                      this.user_student = res['data'][0];
                     // console.log(this.user_student);
                    },
                    (err) => {
                      //console.log(err);
                       //this.user_student ;
                    }
                  );
         },
       (err) => {
         //console.log(err);
         }
     );


    }

  } //end of ngOnInit function

  unAssignMadrasa(madrasa_id:any,student_id:any){

  }

  unAssignCourse(course_id:any,student_id:any){

  }
}
