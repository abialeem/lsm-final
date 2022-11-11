import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {

  subjectExists = false;

  courseIDHasError = true;

  serialNoHasError = true;


  subject = new Subject() ;

  courses: Course[] =[];

  serials :any[] = [];

  serials_before :any[] = Array.from({length: 10}, (_, i) => i + 1);

  serials_after : any[] = this.serials_before;



  msg = "";
  currRole = '';
  noLogin:boolean = true;
  loggedUser = '';
  username = '';

  
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
  
      setTimeout(() => {
        this.admin.getCourses().subscribe(
          (res: any) => {
             //console.log(res);
            this.courses = res['data'];
            
          },
          (err) => {
            console.log(err);
          }
        );
    
      }, 5);

    }   //end of if (this.currRole == "ADMIN") 

  }   // end of ngOnInit function

  addSubject():void{

    console.log('add subject submitted');
    this.admin.addSubject(this.subject).subscribe(
    (data: any) => {
          //console.log(data);
          //show success msg to admin user
          this.msg="Subject Added Successfully ";
    
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg= error.error.message;
        }
    )
    
    }
    
    removeMsg():void{
    this.msg = '';
    }

    validateSubjectSerialNo(serial_no:any){
      if(serial_no=='null'){
        this.serialNoHasError = true;
      }
      else{
        this.serialNoHasError = false;
      }
    }

    validateTitle(title:any,course_id:any){

//check if subject title of course exists already in server db
this.admin.checkIfSubjectOfCourseExists(title,course_id).subscribe(
  (res: any) => {
     //console.log(res);
     if(res['result']==0){
      this.subjectExists = false;
     }
     else{
      this.subjectExists = true;
     }
  
  },
  (err) => {
    console.log(err);
  }
);
    }

    validatecourseID(course_id:any){
      if(course_id=='null'){
        this.courseIDHasError = true;
      }
      else{
        this.courseIDHasError = false;
      }
      this.serialNoHasError = true;
    }


    getSerials(course_id:any){
      
      this.admin.getCourseSubjectsSerials(course_id).subscribe(
        (res: any) => {
           //console.log(res);
          this.serials = res['data'].map(Number);
          
          //console.log(this.serials);
    //after getting serials now generate serials for the options of serial select control
        this.serials_after = this.serials_before.filter( (obj) => {
          return this.serials.indexOf(obj) === -1;
        });
       // console.log(this.serials_after);
        },
        (err) => {
          console.log(err);
        }
      );

    }

}   //end of main class 
