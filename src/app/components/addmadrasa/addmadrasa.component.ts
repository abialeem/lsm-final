import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addmadrasa',
  templateUrl: './addmadrasa.component.html',
  styleUrls: ['./addmadrasa.component.css']
})
export class AddmadrasaComponent implements OnInit {

  jamiatHasError = true;

  jamaatHasError = true;

  msg = "";
  currRole = '';
  madrasa = new Madrasa();
  noLogin:boolean = true;
  loggedUser = '';
  username = '';
  jamaats :any[] = [];
  jamiats :any[] = [];

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
      this.admin.getJamaats().subscribe(
        (res: any) => {
           //console.log(res);
          this.jamaats = res['data'];
          
        },
        (err) => {
          console.log(err);
        }
      );
  
      this.admin.getJamiats().subscribe(
        (res: any) => {
           //console.log(res);
          this.jamiats = res['data'];
          
        },
        (err) => {
          console.log(err);
        }
      );
      
    }, 5);
  
  
  }

  }


  validateJamiat(jamiat_value: any){
    if(jamiat_value=='null'){
      this.jamiatHasError = true;
    }
    else{
      this.jamiatHasError = false;
    }
    // console.log(jamiat_value);
  }


  validateJamaat(jamaat_value: any){
    if(jamaat_value=='null'){
      this.jamaatHasError = true;
    }
    else{
      this.jamaatHasError = false;
    }
    // console.log(jamaat_value);
  }

  addMadrasa():void{

    console.log('add madrasa submitted');
   // console.log(this.madrasa);
    this.admin.addMadrasa(this.madrasa).subscribe(
      (data: any) => {
        console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Added Successfully ";

      },
      (error: { error: any; }) => {
       // console.log(error.error);
        this.msg= error.error.message;
      }
    )
  }

  removeMsg():void{
    this.msg = '';
  }

}
