import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-madrasa-teacher-item',
  templateUrl: './single-madrasa-teacher-item.component.html',
  styleUrls: ['./single-madrasa-teacher-item.component.css']
})
export class SingleMadrasaTeacherItemComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  @Input() public teacher_id: any;  

  @Input() public madrasa_id: any;  

  @Input() public teacher = new Teacher();

  @Output() unAssignTeacherEvent = new EventEmitter<number>();

  teacher_subjects : Subject[] = [] ;
  selectedSubject: any;
  selectedSubjectID: any ;

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');

      
    this.admin.getSingleMadrasaTeacherSubjects(this.madrasa_id,this.teacher_id).subscribe(
      (res: any) => {
          //console.log(res);
          if(res['data'][0].id=="null"){
            this.teacher_subjects = [];
          }
          else{
        this.teacher_subjects = res['data'];
          }
          
      },
      (err) => {
        //console.log(err);
      }
    );


  }   //end of ngOnInit function


  unassignTeacher(teacher:Teacher){
    //unassign teacher from madrasa
    this.admin.unassignTeacher(teacher).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Teacher unassigned Successfully ";
        this.unAssignTeacherEvent.emit(1);
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
        //console.log(error.error);
        this.msg= error.error.message;
        this.unAssignTeacherEvent.emit(0);
      }
    )
   
  } 
  unassignSubjectTeacher(teacher_id:any,subject_id:any,madrasa_id:any){
    //unassign teacher from  given subject  within given madrasa
    // console.log(teacher_id + '-' + subject_id + '-' + madrasa_id );
    this.admin.unAssignTeacherFromSubjectOfMadrasa(teacher_id,subject_id,madrasa_id).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Subject's Teacher unassigned Successfully ";
        this.unAssignTeacherEvent.emit(1);
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
      //  console.log(error.error);
        this.msg= error.error.message;
        this.unAssignTeacherEvent.emit(0);
      }
    )

  }     //end of unassignTeacher  function

  selectSubject(subject_title:any,subject_id:any){
    this.selectedSubject = subject_title;
    this.selectedSubjectID = subject_id;
}

removeSelectSubject(){
  this.selectedSubject = '';
  this.selectedSubjectID = 0;
}

}   //end of main class
