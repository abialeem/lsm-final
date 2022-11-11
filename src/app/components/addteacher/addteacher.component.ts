import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Madrasa } from 'src/app/models/madrasa';
import { Teacher } from 'src/app/models/teacher';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
 
@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {

  usernameHasError = true;

  emailHasError = true;

  emailExists = false;

  passwordHasError = true;




  msg = "";
  currRole = '';
  teacher = new Teacher();
  user = new User();
  teacherdata = new Teacherdata() ;
  noLogin:boolean = true;
  loggedUser = '';
  username = '';

  // madrasas :Madrasa[] = [] ;

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


  } //end of ngOnInt

  validateUsername(username: any){
    if(username=='enter username'){
      this.usernameHasError = true;
    }
    else{
      this.usernameHasError = false;
    }
    
  }

  validateEmail(email: any){
    if(email=='enter email'){
      this.emailHasError = true;
    }
    else{

        //validate format of email id here


          //check if email exists already in server db
          this.admin.checkIfEmailExists(email).subscribe(
                  (res: any) => {
                     //console.log(res);
                     if(res['result']==0){
                      this.emailExists = false;
                      this.emailHasError = false;
                     }
                     else{
                      this.emailHasError = false;
                      this.emailExists = true;
                     }
                    
                    
                  },
                  (err) => {
                    console.log(err);
                  }
                );
     
    }
    
  }

  validatePassword(password: any){
    if(password=='here'){
      this.passwordHasError = true;
    }
    else{
      this.passwordHasError = false;
    }
    
  }


  addTeacher():void{

    console.log('add teacher submitted');
   this.admin.addTeacher(this.teacherdata).subscribe(
    (data: any) => {
          //console.log(data);
          //show success msg to admin user
          this.msg="Teacher Added Successfully ";
  
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

class Teacherdata {
  username:string = '';
  email :string = '';
  password : string = '';
  title : string = '';
  address : string = '';

  constructor() {}
}