import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Madrasa } from 'src/app/models/madrasa';
import { Teacher } from 'src/app/models/teacher';
import { Student } from 'src/app/models/student';
import { Principal } from 'src/app/models/principal';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-single-madrasa',
  templateUrl: './single-madrasa.component.html',
  styleUrls: ['./single-madrasa.component.css']
})
export class SingleMadrasaComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  madrasa = new Madrasa();
  current_madrasa_id : any = '';
  madrasa_courses : Course[] = [];
  madrasa_teachers : Teacher[] = [];
  madrasa_students : Student[] = [];
  madrasa_principal = new Principal();
  madrasa_data_count = new Madrasa_data_count();

  selectedTeachers: any[] = [];
  selectedStudents: any[] = [];
  selectedPrincipal:any = '';

  toBeUpdatedPrincipal = new Principal();
  toBeUpdatedTeacher = new Teacher();
  toBeUpdatedStudent = new Student();

  availableTeachers: Teacher[] = [];

  availableStudents: Student[] = [];

  availablePrincipals: Principal[] = [];

  selectStudentsHasError = true;

  selectPrincipalHasError = true;

  selectTeachersHasError = true;

  selectCoursesHasError = true;

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

      this.current_madrasa_id = this.activatedRoute.snapshot.paramMap.get("id");
      setTimeout(() => {
        this.admin.getSingleMadrasa(this.current_madrasa_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.madrasa = res['data'][0];
            //console.log(this.madrasa);

          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleMadrasaCourses(this.current_madrasa_id).subscribe(
          (res: any) => {
             //console.log(res);
             if(res['data'] == undefined){
              this.madrasa_courses = [];
              this.madrasa_data_count.course_count = 0;
             }
             else{
              this.madrasa_courses = res['data'];
              this.madrasa_data_count.course_count = res['data'].length;
             }
            
            //console.log(this.madrasa_courses);
          },
          (err) => {
            //console.log(err);
            this.madrasa_teachers = [];
          }
        );

        this.admin.getSingleMadrasaTeachers(this.current_madrasa_id).subscribe(
          (res: any) => {
             //console.log(res);
             if(res['data'] == undefined){
              this.madrasa_teachers = [];
              this.madrasa_data_count.teacher_count = 0;
             }
             else{
              this.madrasa_teachers = res['data'];
              this.madrasa_data_count.teacher_count = res['data'].length;
             }
            
            //console.log(this.madrasa_teachers);
          },
          (err) => {
            //console.log(err);
            this.madrasa_teachers = [];
          }
        );

        this.admin.getSingleMadrasaStudents(this.current_madrasa_id).subscribe(
          (res: any) => {
             //console.log(res);
            
            if(res['data'] == undefined){
              this.madrasa_students = [];
              this.madrasa_data_count.student_count = 0 ;
             }
             else{
              this.madrasa_students = res['data'];
              this.madrasa_data_count.student_count = res['data'].length;
              //console.log(this.madrasa_students);
             }
          },
          (err) => {
            //console.log(err);
            this.madrasa_students = [];
          }
        );

        this.admin.getSingleMadrasaPrincipal(this.current_madrasa_id).subscribe(
          (res: any) => {
             console.log(res);
            this.madrasa_principal = res['data'][0];
              if(res['data'][0].id == null){
                this.madrasa_data_count.principal_assigned = '0';
              }
              else{
                this.madrasa_data_count.principal_assigned = '1';
              }
            //console.log(this.madrasa_principal);
            console.log(this.madrasa_data_count.principal_assigned);
          },
          (err) => {
            //console.log(err);
            
          }
        );

        this.admin.getUnassignedTeachers(this.current_madrasa_id).subscribe(
          (res: any) => {
             //console.log(res);
           
           
            if(res['data'].length > 0){

              this.availableTeachers = res['data'];
               // console.log (this.availableTeachers);


               
                                  //old way of getting available teachers starts here


              // for (let i = 0; i < this.availableTeachers.length; i++) {
              //     if(this.availableTeachers[i] != undefined ){
              //       if(this.availableTeachers[i].madrasa_id!="not assigned yet"){
              //         for (let j = 0; j < this.availableTeachers[i].madrasa_id.length; j++) {
              //               if( this.availableTeachers[i].madrasa_id[j] == this.current_madrasa_id ){
              //                   //remove this element from array
              //                  //console.log ("inside loop 2 "+this.availableTeachers[i].madrasa_id[j]);
              //                  this.availableTeachers.splice(i, 1);
              //              }
                          

              //          }
              //       }else{
              //            //some element has not assigned yet madrasa id , hence skip them dont slice them
              //            continue 
              //            }
              //     }
              //     else{
              //             //some element has undefined madrasa id so empty the array for security
              //       this.availableTeachers = [];
              //     }
              // }


                             //old way of getting available teachers starts here



              //console.log (this.availableTeachers );
            }
            else{
              this.availableTeachers = [];
            }
            //console.log(this.availableTeachers);
          },
          (err) => {
            //console.log(err);
            this.availableTeachers = [];
          }
        );

        this.admin.getUnassignedStudents().subscribe(
          (res: any) => {
             //console.log(res);
            this.availableStudents = res['data'];
            //console.log(this.availableStudents);
          },
          (err) => {
            //console.log(err);
            this.availableStudents = [];
          }
        );

        this.admin.getUnassignedPrincipals().subscribe(
          (res: any) => {
             //console.log(res);
            this.availablePrincipals = res['data'];
            //console.log(this.availablePrincipals);
          },
          (err) => {
            //console.log(err);
            this.availablePrincipals = [];
          }
        );
           
        
      }, 5);
  
  
    }


  }     //end of ngOnInt function


  unassignPrincipal(principal:Principal){
    //unassign principal from madrasa
    //console.log(principal);
    this.admin.unassignPrincipal(principal).subscribe(
      (data: any) => {
        //console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Principal Unassigned Successfully ";
        this.ngOnInit();
          // the unassign principal flow ends here 
      },
      (error: { error: any; }) => {
       // console.log(error.error);
        this.msg= error.error.message;
        this.ngOnInit();
      }
    )
    
}           //end of unassignPrincipal function


  unassignStudent(student:Student){
      //unassign student from madrasa
      this.admin.unassignStudent(student).subscribe(
        (data: any) => {
         // console.log(data);
          //show success msg to admin user
          this.msg="Madrasa Student unassigned Successfully ";
          this.ngOnInit();
            // the unassign student flow ends here 
        },
        (error: { error: any; }) => {
         // console.log(error.error);
          this.msg= error.error.message;
          this.ngOnInit();
        }
      )
      
  }         //end of unassignStudent function



  unassignTeacher(teacher:Teacher){
    //unassign teacher from madrasa
    this.admin.unassignTeacher(teacher).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Teacher unassigned Successfully ";
        this.ngOnInit();
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
        //console.log(error.error);
        this.msg= error.error.message;
        this.ngOnInit();
      }
    )
   
  }         //end of unassignTeacher function

  unassignCourse(course:Course){
    //unassign course from madrasa
    this.admin.unassignCourse(course).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Course unassigned Successfully ";
        this.ngOnInit();
          // the unassign teacher flow ends here 
      },
      (error: { error: any; }) => {
        //console.log(error.error);
        this.msg= error.error.message;
        this.ngOnInit();
      }
    )

  }     //end of unassignCourse function


  validateSelectedCourses(selectedCourses: any){
    if(selectedCourses=='null'){
      this.selectCoursesHasError = true;
    }
    else{
      this.selectCoursesHasError = false;
    }
    // console.log(selectTeachers);
  }//end of validateSelectedCourses function



  validateSelectedTeachers(selectedTeachers: any){
    if(selectedTeachers=='null'){
      this.selectTeachersHasError = true;
    }
    else{
      this.selectTeachersHasError = false;
    }
    // console.log(selectTeachers);
  }//end of validateSelectedTeachers function


  validateSelectedStudents(selected: any){
    if(selected=='null'){
      this.selectStudentsHasError = true;
    }
    else{
      this.selectStudentsHasError = false;
    }
    // console.log(selected);
  }//end of validateSelectedStudents function

  validateSelectedPrincipal(selected: any){
    if(selected=='null'){
      this.selectPrincipalHasError = true;
    }
    else{
      this.selectPrincipalHasError = false;
    }
    // console.log(selected);
  }//end of validateSelectedPrincipal function



  assignTeachers():void{

   // console.log('assign teachers submitted');
    //console.log(this.selectedTeachers);

    for(let i=0; i<this.selectedTeachers.length; i++){
       
      if(this.selectedTeachers[i] != "null"){
        //console.log(this.selectedTeachers[i]);
        this.toBeUpdatedTeacher.id = this.selectedTeachers[i];
        this.toBeUpdatedTeacher.madrasa_id = this.current_madrasa_id;

          //call function from admin service to assignteacher
          this.admin.assignTeacher(this.toBeUpdatedTeacher).subscribe(
            (data: any) => {
             // console.log(data);
              //show success msg to admin user
              this.msg="Teacher Assigned  Successfully ";
              this.ngOnInit();
                // the assign teacher flow ends here 
            },
            (error: { error: any; }) => {
             // console.log(error.error);
              this.msg= error.error.message;
              this.ngOnInit();
            }
          )
      } //check to exclude the null option ends here
   }  //for loop ends here
        //refresh the component here
       
  }

  assignStudents():void{

    // console.log('assign students submitted');
    // console.log(this.selectedStudents);

    for(let i=0; i<this.selectedStudents.length; i++){
       
      if(this.selectedStudents[i] != "null"){
        //console.log(this.selectedStudents[i]);
        this.toBeUpdatedStudent.id = this.selectedStudents[i];
        this.toBeUpdatedStudent.madrasa_id = this.current_madrasa_id;

          //call function from admin service to assignteacher
          this.admin.assignStudent(this.toBeUpdatedStudent).subscribe(
            (data: any) => {
             // console.log(data);
              //show success msg to admin user
              this.msg="Student Assigned  Successfully ";
               this.ngOnInit();
                // the assign teacher flow ends here 
            },
            (error: { error: any; }) => {
             // console.log(error.error);
              this.msg= error.error.message;
              this.ngOnInit();
            }
          )
      } //check to exclude the null option ends here
   }  //for loop ends here
        //refresh the component here
       
    
  }

  assignPrincipal():void{

    //console.log('assign principal submitted');
    this.toBeUpdatedPrincipal.id = this.selectedPrincipal;
    this.toBeUpdatedPrincipal.madrasa_id = this.current_madrasa_id;
    //unassign previous principal from given madrasa if any
    this.admin.unassignPrincipal(this.madrasa_principal).subscribe(
        (data: any) => {
         // console.log(data);
          //show success msg to admin user
          //this.msg="Madrasa Principal Unassigned Successfully ";
          this.admin.assignPrincipal(this.toBeUpdatedPrincipal).subscribe(
            (data: any) => {
             // console.log(data);
              //show success msg to admin user
              this.msg="Madrasa Principal Updated Successfully ";
              this.ngOnInit();
               
                // the assign principal flow ends here after unassign and assignment of principals
            },
            (error: { error: any; }) => {
             // console.log(error.error);
              this.msg= error.error.message;
            }
          )
        },
        (error: { error: any; }) => {
         // console.log(error.error);
          this.msg= error.error.message;
          this.ngOnInit();
        }
      )
      
  }

  removeMsg():void{
    this.msg = '';
  }

} //end of class main

class Madrasa_data_count {
  teacher_count : any = '0';
  student_count : any = '0';
  course_count : any = '0';
  principal_assigned : any = '0' ; 
 constructor() {}
}