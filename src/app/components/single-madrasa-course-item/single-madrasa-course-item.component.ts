import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-madrasa-course-item',
  templateUrl: './single-madrasa-course-item.component.html',
  styleUrls: ['./single-madrasa-course-item.component.css']
})
export class SingleMadrasaCourseItemComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  @Input() public course_id: any;  

  @Input() public madrasa_id: any;  

  @Input() public course = new Course();

  @Output() unAssignCourseEvent = new EventEmitter<number>();

  course_subjects : Subject[] = [];
  availableTeachers: Teacher[] = [];

  selectTeacherHasError = true;

  selectedSubject : any ;
  selectedSubjectID : any = 0 ;

  selectedTeacher = new Teacher() ;

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');

   


    this.admin.getSingleMadrasaCourseSubjects(this.course_id,this.madrasa_id).subscribe(
      (res: any) => {
          console.log(res);
          if(res['data'][0].id=="null"){
            //this.course_data_count.subject_count = 0;
            this.course_subjects = [];
          }
          else{
        this.course_subjects = res['data'];

        //this.course_data_count.subject_count = res['data'].length;
          }
          
      },
      (err) => {
        //console.log(err);
      }
    );

    this.admin.getSingleMadrasaTeachers(this.madrasa_id).subscribe(
      (res: any) => {
         //console.log(res);
         if(res['data'] == undefined){
          this.availableTeachers = [];
         }
         else{
          this.availableTeachers = res['data'];
         }
        
        //console.log(this.madrasa_teachers);
      },
      (err) => {
        //console.log(err);
        this.availableTeachers = [];
      }
    );

  }     //  end of ngOnInt Function



  unassignCourse(course:Course){
    //unassign course from madrasa
    //console.log(course);
    course.madrasa_id = this.madrasa_id;
    this.admin.unassignCourse(course).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Course unassigned Successfully ";
        this.unAssignCourseEvent.emit(1);
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
      //  console.log(error.error);
        this.msg= error.error.message;
        this.unAssignCourseEvent.emit(0);
      }
    )

  }     //end of unassignCourse function

  unassignSubjectTeacher(teacher_id:any,subject_id:any,madrasa_id:any){
    //unassign teacher from  given subject  within given madrasa
    // console.log(teacher_id + '-' + subject_id + '-' + madrasa_id );
    this.admin.unAssignTeacherFromSubjectOfMadrasa(teacher_id,subject_id,madrasa_id).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Subject's Teacher unassigned Successfully ";
        this.unAssignCourseEvent.emit(1);
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
      //  console.log(error.error);
        this.msg= error.error.message;
        this.unAssignCourseEvent.emit(0);
      }
    )

  }     //end of unassignTeacher  function

  assignTeacher(){
    // console.log('subject id ' 
    // + this.selectedSubjectID + '-----' +
    //  'madrasa_id ' + this.madrasa_id + '--------' + 
    //  'course_id ' + this.course_id + '---------' + 'teacher_id' 
    //  + this.selectedTeacher);
    this.admin.assignTeacherToSubjectOfMadrasa(this.selectedTeacher,this.selectedSubjectID,this.madrasa_id,this.course_id).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Subject's Teacher assigned Successfully ";
        // this.unAssignCourseEvent.emit(1);
        this.ngOnInit();
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
      //  console.log(error.error);
        this.msg= error.error.message;
        this.ngOnInit();
        // this.unAssignCourseEvent.emit(0);
      }
    )
  }


  selectSubject(subject_title:any,subject_id:any){
      this.selectedSubject = subject_title;
      this.selectedSubjectID = subject_id;
  }

  removeSelectSubject(){
    this.selectedSubject = '';
    this.selectedSubjectID = 0;
  }

  validateSelectedTeacher(selectedTeacher: any){
    if(selectedTeacher=='null'){
      this.selectTeacherHasError = true;
    }
    else{
      this.selectTeacherHasError = false;
    }
  }


  removeMsg():void{
    this.msg = '';
  }

}   //  end of main class
