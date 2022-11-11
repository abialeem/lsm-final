import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  courseExists = false;

  courseTypeHasError = true;

  courseSkillLevelHasError = true;

  courseLanguageHasError = true;

  course = new Course() ;


  msg = "";
  currRole = '';
  noLogin:boolean = true;
  loggedUser = '';
  username = '';

  
  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void 
  {
    
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');
  
    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');
  
  
    if(this.currRole === "ADMIN"){
  
    //   setTimeout(() => {
    //     this.admin.getMadrasas().subscribe(
    //       (res: any) => {
    //          //console.log(res);
    //         this.madrasas = res['data'];
            
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    
        
        
    //   }, 5);
    }



  } //end of ngOnInit function

  
  validateTitle(course_title: any){
    

      //check if course title of course exists already in server db
      this.admin.checkIfCourseTitle(course_title).subscribe(
              (res: any) => {
                 //console.log(res);
                 if(res['result']==0){
                  this.courseExists = false;
                 }
                 else{
                  this.courseExists = true;
                 }
              
              },
              (err) => {
                console.log(err);
              }
            );

}

validateCourseType(course_type: any){
  if(course_type=='null'){
    this.courseTypeHasError = true;
  }
  else{
    this.courseTypeHasError = false;
  }

}

validateSkillLevel(skill_level: any){
  if(skill_level=='null'){
    this.courseSkillLevelHasError = true;
  }
  else{
    this.courseSkillLevelHasError = false;
  }

}

validateCourseLanguage(language: any){
  if(language=='null'){
    this.courseLanguageHasError = true;
  }
  else{
    this.courseLanguageHasError = false;
  }

}



addCourse():void{

console.log('add course submitted');
this.admin.addCourse(this.course).subscribe(
(data: any) => {
      //console.log(data);
      //show success msg to admin user
      this.msg="Course Added Successfully ";

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


}
