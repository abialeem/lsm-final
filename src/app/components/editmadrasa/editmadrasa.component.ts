import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editmadrasa',
  templateUrl: './editmadrasa.component.html',
  styleUrls: ['./editmadrasa.component.css']
})
export class EditmadrasaComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  madrasa = new Madrasa();
  current_madrasa_id : any = '';
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
      // setTimeout(() => {
      //   this.admin.getMadrasas().subscribe(
      //     (res: any) => {
      //        //console.log(res);
      //       this.madrasa = res['data'];
            

      //     },
      //     (err) => {
      //       //console.log(err);
      //     }
      //   );
  
           
        
      // }, 5);
  
  
    }


  }     //end of ngOnInt function

} //end of class main

