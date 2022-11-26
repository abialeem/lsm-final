import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { Teacher } from 'src/app/models/teacher';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
 
@Component({
  selector: 'app-singleteacher',
  templateUrl: './singleteacher.component.html',
  styleUrls: ['./singleteacher.component.css']
})
export class SingleteacherComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  teacher = new Teacher();
  user_teacher = new User();
  teacher_madrasa : Madrasa[] = [];
  current_teacher_id : any = '';

  selectedMadrasa:any = '';
  toBeUpdatedTeacher = new Teacher(); //to be used while updating the madrasa or setting teacher to given madrasa
  availableMadrasas: Madrasa[] = [];
  selectMadrasasHasError = true;

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
      this.current_teacher_id = this.activatedRoute.snapshot.paramMap.get("id");
      
      this.admin.getSingleTeacher(this.current_teacher_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.teacher = res['data'][0];
            //console.log(this.teacher);
              this.getTeacherUser();
              this.getTeacherMadrasa();
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getUnassignedMadrasas(this.current_teacher_id).subscribe(
          (res: any) => {
             //console.log(res);
           
           
            if(res['data'].length > 0){

              this.availableMadrasas = res['data'];

            }
            else{
              this.availableMadrasas = [];
            }
            //console.log(this.availableTeachers);
          },
          (err) => {
            //console.log(err);
            this.availableMadrasas = [];
          }
        );
                          //  old way of getting available madrasas starts here

        // this.admin.getMadrasas().subscribe(
        //   (res: any) => {
        //      //console.log(res);
        //     this.availableMadrasas = res['data'];
        //     // console.log(this.availableMadrasas);
        //           if(this.availableMadrasas.length > 0){
        //                 for (let i = 0; i < this.availableMadrasas.length; i++) {
        //                   //console.log(this.availableMadrasas[i].id);
        //                   for (let j = 0; j < this.teacher.madrasa_id.length; j++) {
        //                     //console.log(this.teacher.madrasa_id[j]);
        //                     if( this.availableMadrasas[i].id == this.teacher.madrasa_id[j] ){
        //                                   //console.log( this.availableMadrasas[i].id +'exists');
        //                               this.availableMadrasas.splice(i, 1);
        //                     }
        //                     else{
        //                       continue
        //                     }
        //                   }
        //                 }
        //           }
        //           else{
        //             this.availableMadrasas = [];
        //           }
        //   },
        //   (err) => {
        //     //console.log(err);
        //     this.availableMadrasas = [];
        //   }
        // );
                    //   old way of getting available madrasas ends here
     
    }
  }   //ngOnInit function ends here

  validateSelectedMadrasas(selected: any){
    if(selected=='null'){
      this.selectMadrasasHasError = true;
    }
    else{
      this.selectMadrasasHasError = false;
    }
    // console.log(selected);
  }//end of validateSelectedMadrasas function
  
  unassignMadrasa(madrasa_id:any,teacher_id:any){
      //unassign madrasa from this teacher
      this.toBeUpdatedTeacher.id = teacher_id;
      this.toBeUpdatedTeacher.madrasa_id = madrasa_id;
      //console.log(this.toBeUpdatedTeacher);
          //call the unassignTeacher function from admin service
          this.admin.unassignTeacher(this.toBeUpdatedTeacher).subscribe(
            (data: any) => {
             // console.log(data);
              //show success msg to admin user
              this.msg="Madrasa Teacher unassigned Successfully ";
              this.toBeUpdatedTeacher.id = "";
              this.toBeUpdatedTeacher.madrasa_id = "";
              this.teacher_madrasa = [];
              this.ngOnInit();
                // the unassign teacher flow ends here 
            },
            (error: { error: any; }) => {
              //console.log(error.error);
              this.msg= error.error.message;
              this.toBeUpdatedTeacher.id = "";
              this.toBeUpdatedTeacher.madrasa_id = "";
              this.teacher_madrasa = [];
              this.ngOnInit();
            }
          )
  }

  assignTeacher(){
      this.toBeUpdatedTeacher.id = this.current_teacher_id;
      this.toBeUpdatedTeacher.madrasa_id = this.selectedMadrasa;
      //call function from admin service to assignteacher
      this.admin.assignTeacher(this.toBeUpdatedTeacher).subscribe(
        (data: any) => {
         // console.log(data);
          //show success msg to admin user
          this.msg="Teacher Assigned  Successfully ";
          this.toBeUpdatedTeacher.id = "";
          this.toBeUpdatedTeacher.madrasa_id = "";
          this.teacher_madrasa = [];
          this.ngOnInit();
            // the assign teacher flow ends here 
        },
        (error: { error: any; }) => {
         // console.log(error.error);
          this.msg= error.error.message;
          this.toBeUpdatedTeacher.id = "";
          this.toBeUpdatedTeacher.madrasa_id = "";
          this.teacher_madrasa = [];
          this.ngOnInit();
        }
      )
  }


  removeMsg():void{
    this.msg = '';
  }
  
  getTeacherUser(){
  
    this.admin.getSingleUser(this.teacher.user_id).subscribe(
      (res: any) => {
         //console.log(res);
        this.user_teacher = res['data'][0];
       // console.log(this.user_teacher);
      },
      (err) => {
        //console.log(err);
         //this.user_teacher ;
      }
    );
  
  }
  
  getTeacherMadrasa(){
     //check if teacher has any madrasa assigned
    // console.log(this.teacher.madrasa_id.length);
     if(this.teacher.madrasa_id != "not assigned yet" ) {
        for(let i =0 ; i < this.teacher.madrasa_id.length ; i++ ){
          this.admin.getSingleMadrasa(this.teacher.madrasa_id[i]).subscribe(
                (res: any) => {
                   //console.log(res);
                  this.teacher_madrasa[i] = res['data'][0];
                  //console.log(this.teacher_madrasa);
                },
                (err) => {
                  //console.log(err);
                  //console.log(this.teacher_madrasa);
                }
              );
        }

                  //old way to get teacher madrasas starts here

    //   this.admin.getSingleMadrasa(this.teacher.madrasa_id).subscribe(
    //     (res: any) => {
    //        //console.log(res);
    //       this.teacher_madrasa = res['data'][0];
    //       console.log(this.teacher_madrasa);
          
    //     },
    //     (err) => {
    //       //console.log(err);
    //       this.teacher_madrasa ;
    //       //console.log(this.teacher_madrasa);
    //     }
    //   );

                  //old way to get teacher madrasas ends here
    }
    else{
      this.teacher_madrasa = [];
    }
  }
  

}   //end of class main

