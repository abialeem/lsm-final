import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { Principal } from 'src/app/models/principal';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-singleprincipal',
  templateUrl: './singleprincipal.component.html',
  styleUrls: ['./singleprincipal.component.css']
})
export class SingleprincipalComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  principal = new Principal();
  user_principal = new User();
  principal_madrasa = new Madrasa();
  current_principal_id : any = '';

  selectedMadrasa:any = '';
  toBeUpdatedPrincipal = new Principal(); //to be used while updating the madrasa or setting principal to given madrasa
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
      this.current_principal_id = this.activatedRoute.snapshot.paramMap.get("id");
      
      this.admin.getSinglePrincipal(this.current_principal_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.principal = res['data'][0];
            //console.log(this.principal);
              this.getPrincipalUser();
              this.getPrincipalMadrasa();
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getMadrasasWithoutPrincipal().subscribe(
          (res: any) => {
             //console.log(res);
            this.availableMadrasas = res['data'];
            //console.log(this.availableMadrasas);
          },
          (err) => {
            //console.log(err);
            this.availableMadrasas = [];
          }
        );

     
    }


  } //end of ngOnInit function


  unassignPrincipal(principal:Principal){
    //unassign principal from madrasa
    //console.log(principal);
    this.admin.unassignPrincipal(principal).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        this.msg="Madrasa Principal Unassigned Successfully ";
        this.ngOnInit();
       //put principal_madrasa = null 
       this.principal_madrasa = new Madrasa();
          // the unassign principal flow ends here 
      },
      (error: { error: any; }) => {
        //console.log(error.error);
        this.msg= error.error.message;
        this.ngOnInit();
      }
    )
   
}           //end of unassignPrincipal function

validateSelectedMadrasas(selected: any){
  if(selected=='null'){
    this.selectMadrasasHasError = true;
  }
  else{
    this.selectMadrasasHasError = false;
  }
  // console.log(selected);
}//end of validateSelectedMadrasas function



assignPrincipal():void{

  //console.log('assign principal submitted');
  this.toBeUpdatedPrincipal.id = this.principal.id;
  this.toBeUpdatedPrincipal.madrasa_id = this.selectedMadrasa;

  //unassign previous principal from given madrasa if any
  this.admin.unassignPrincipal(this.principal).subscribe(
      (data: any) => {
       // console.log(data);
        //show success msg to admin user
        //this.msg="Madrasa Principal Unassigned Successfully ";

        this.admin.assignPrincipal(this.toBeUpdatedPrincipal).subscribe(
          (data: any) => {
           // console.log(data);
            //show success msg to admin user
            this.msg="Principal Assigned To Madrasa Successfully ";
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

getPrincipalUser(){

  this.admin.getSingleUser(this.principal.user_id).subscribe(
    (res: any) => {
       //console.log(res);
      this.user_principal = res['data'][0];
      //console.log(this.user_principal);
    },
    (err) => {
      //console.log(err);
       //this.user_principal ;
    }
  );

}

getPrincipalMadrasa(){
   //check if principal has any madrasa assigned
   if(this.principal.madrasa_id !="0" ) {
    this.admin.getSingleMadrasa(this.principal.madrasa_id).subscribe(
      (res: any) => {
         //console.log(res);
        this.principal_madrasa = res['data'][0];
        //console.log(this.principal_madrasa);
        
      },
      (err) => {
        //console.log(err);
        this.principal_madrasa ;
        //console.log(this.principal_madrasa);
      }
    );
  }
}


}
