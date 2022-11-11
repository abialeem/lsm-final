import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { Admin } from 'src/app/models/admin';
import { LoginService } from 'src/app/services/login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  professor = new Professor();
  admin = new Admin();
  msg = "";
  adminEmail = "";
  adminPassword = "";
  currRole = '';
  
  constructor(private _service : LoginService, private _router : Router) { }

  ngOnInit(): void 
  {
    if(this._service.isUserLoggedIn()){
        // console.log(sessionStorage.getItem('USER'));
        this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
        this.currRole = this.currRole.replace(/"/g, '');
        
        if(this.currRole === "ADMIN"){
          this._router.navigate(['/admindashboard']);
        }
        else if(this.currRole === "PROFESSOR"){
          this._router.navigate(['/professordashboard']);
        }
        else if(this.currRole === "USER"){
          this._router.navigate(['/userdashboard']);
        }
        else if(this.currRole === "ROLE UNDEFINED"){
          sessionStorage.clear();
          this._router.navigate(['/']);
        }
        else{
          sessionStorage.clear();
          
        }

    }
    else{

      sessionStorage.clear();
      
    }
    
  }

  loginUser()
  {
      // this._service.loginUserFromRemote(this.user).subscribe(
      //   (data: any) => {
      //     // console.log(data);
      //     console.log("Response Received");
      //     sessionStorage.setItem('loggedUser', this.user.email);
      //     sessionStorage.setItem('USER', this.user.username);
      //     sessionStorage.setItem('ROLE', "USER");
      //     sessionStorage.setItem('name', this.user.username);
      //     sessionStorage.setItem('gender', this.user.gender);
      //     sessionStorage.setItem('profession', this.user.profession);
      //     sessionStorage.setItem('address', this.user.address);
      //     this._router.navigate(['/userdashboard']);
      //   },
      //   (error: { error: any; }) => {
      //     console.log(error.error);
      //     this.msg="Bad credentials, please enter valid credentials !!!";
      //   }
      // )
  }

  loginProfessor()
  {
      // this._service.loginProfessorFromRemote(this.professor).subscribe(
      //   (data: any) => {
      //     // console.log(data);
      //     console.log("Response Received");
      //     sessionStorage.clear();
      //     sessionStorage.setItem('loggedUser', this.professor.email);
      //     sessionStorage.setItem('USER', this.professor.professorname);
      //     sessionStorage.setItem('ROLE', "PROFESSOR");
      //     sessionStorage.setItem('professorname',this.professor.professorname);
      //     sessionStorage.setItem('gender', this.professor.gender);
      //     this._router.navigate(['/professordashboard']);
      //   },
      //   (error: { error: any; }) => {
      //     console.log(error.error);
      //     this.msg="Bad credentials, please enter valid credentials !!!";
      //   }
      // )
  }

  adminLogin()
  {
    this._service.adminLoginFromRemote(this.admin).subscribe(
      (data: any) => {
        // console.log(data);
        console.log("Admin Logged In");
        sessionStorage.setItem('loggedUser', data['data'][0].email);
        sessionStorage.setItem('USER', data['data'][0].username);
        sessionStorage.setItem('ROLE', "ADMIN");
        sessionStorage.setItem('name', data['data'][0].username);
        sessionStorage.setItem('adminId', data['data'][0].id);
        sessionStorage.setItem('gender', "undefined");
        // console.log(data['data'][0].username);
        // this._router.navigate(['/admindashboard']);
        window.location.replace('/admindashboard');
      },
      (error: { error: any; }) => {
        console.log(error.error);
        this.msg="Bad credentials, please enter valid credentials !!!";
      }
    )
  }

}
 

class User 
{

    username : string = '';
    userid : string = 'empty';
    email : string = '';
    profession : string = '';
    gender : string = '';
    mobile : string = '';
    address : string = '';
    password : string = '';

    constructor() {}
}

