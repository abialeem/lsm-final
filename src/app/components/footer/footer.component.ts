import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  loggedUser = '';
  currRole = '';
  title = '';
  username = '';


  constructor(private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');

    if(this.currRole === "ADMIN"){
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "PROFESSOR"){
      this.title = "Professor Dashboard";
    }
    else if(this.currRole === "USER"){
      this.title = "User Dashboard";
    }
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  navigateHome()
  {
    if(this.currRole === "ADMIN"){
      this._router.navigate(['/admindashboard']);
    }
    else if(this.currRole === "PROFESSOR"){
      this._router.navigate(['/professordashboard']);
    }
    else if(this.currRole === "USER"){
      this._router.navigate(['/userdashboard']);
    }
  }

}
