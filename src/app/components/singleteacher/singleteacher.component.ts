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
  teacher_madrasa = new Madrasa();
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

        this.admin.getMadrasas().subscribe(
          (res: any) => {
             //console.log(res);
            this.availableMadrasas = res['data'];
            //console.log(this.availableMadrasas);

                  // //filter array except assigned madrasa
                  // let filteredMadrasas = this.availableMadrasas.filter((x:any)=>{ return x.id != this.teacher.madrasa_id;})
                  // //console.log(filteredMadrasas);
                  // this.availableMadrasas = filteredMadrasas; 
          },
          (err) => {
            //console.log(err);
            this.availableMadrasas = [];
          }
        );

     
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
  
  unassignTeacher(teacher:Teacher){
      //unassign a teacher , turn madrasa_id = 0 for this teacher

  }

  assignTeacher(){

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
     if(this.teacher.madrasa_id !="0" ) {
      this.admin.getSingleMadrasa(this.teacher.madrasa_id).subscribe(
        (res: any) => {
           //console.log(res);
          this.teacher_madrasa = res['data'][0];
          //console.log(this.principal_madrasa);
          
        },
        (err) => {
          //console.log(err);
          this.teacher_madrasa ;
          //console.log(this.principal_madrasa);
        }
      );
    }
  }
  

}   //end of class main

