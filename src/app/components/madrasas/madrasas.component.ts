import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-madrasas',
  templateUrl: './madrasas.component.html',
  styleUrls: ['./madrasas.component.css']
})
export class MadrasasComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  madrasas : Madrasa[]=[];
  
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
      this.admin.getMadrasas().subscribe(
        (res: any) => {
           console.log(res);
          this.madrasas = res['data'];
        },
        (err) => {
          console.log(err);
        }
      );
    }, 5);


  }


}

}
