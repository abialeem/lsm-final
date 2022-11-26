import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subject } from 'rxjs';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-madrasas',
  templateUrl: './madrasas.component.html',
  styleUrls: ['./madrasas.component.css']
})
export class MadrasasComponent implements OnInit  {


  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  madrasas : Madrasa[]=[];

  dtOptions: any = {};
 
  // dtTrigger: Subject <any> = new Subject<any>();
  
  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService, private renderer: Renderer2) { }

  

  ngOnInit(): void {
   
    this.dtOptions = {
      ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllMadrasas.php',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'madrasa_title',
        render: function (data:any) {
          data = '<span class="text-default" style="font-size:14px;text-transform:capitalize;font-weight:bold;">'+ data +'</span>';
              return data;
      },
      }, {
        title: 'Address',
        data: 'madrasa_address',
        render: function (data:any) {
          data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
      }, {
        title: 'Jamiat',
        data: 'jamiat',
        render: function (data:any) {
          data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
      }, {
        title: 'Jamaat',
        data: 'jamaat',
        render: function (data:any) {
          data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
        
      },
      {
        title: 'Principal',
        data: 'principal',
        render: function (data:any) {
              if(data === "not assigned yet"){
                data = '<span class="text-danger" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              }
              else{
                data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              }
         
              return data;
      },
        
      },
      {
        title: 'Student(s) Count',
        data: 'madrasa_student_count',
        render: function (data:any) {
          
              if (data === '0') {
                  data = '<span class="badge badge-danger">0</span> <span class="text-danger" style="font-size:14px;">no student added yet!</span>';
              } else if (data !== '0') {
                  data = '<span class="badge badge-success">'+ data +'</span> <span class="text-success" style="font-size:14px;">student(s) </span>'; 
              }

          return data;
      },

      },
      {
        title: 'Teacher(s) Count',
        data: 'madrasa_teacher_count',
        render: function (data:any) {
          
              if (data === '0') {
                  data = '<span class="badge badge-danger">0</span> <span class="text-danger" style="font-size:14px;">no teachers added yet!</span>';
              } else if (data !== '0') {
                  data = '<span class="badge badge-success">'+ data +'</span> <span class="text-success" style="font-size:14px;">teacher(s) </span>'; 
              }

          return data;
      },
      },{
        title : 'Status',
        data : 'status',
        render: function (data:any) {
              if(data === "0"){
                data = '<span class="text-danger" style="font-size:14px;text-transform:capitalize;">In Active</span>';
              }
              else{
                data = '<span class="text-success" style="font-size:14px;text-transform:capitalize;">Active</span>';
              }
         
              return data;
      },
      },
      {
        title: 'Actions',
        data: 'id',
        orderable: false,
  "render":  (data:any) => { 
    return `<div class='actions-buttons  center' id='${data}'>
     
     <i class='fa fa-eye pointer' title='View' view-config-id="${data}"></i>
     <i class='fa fa-edit pointer' title='Edit' edit-config-id="${data}"></i>
     </div>`;
   }
        
      }
    ],
 
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      //scrollX: true,
      responsive: true,
      deferRender: true,
      // Configure the buttons
      buttons: [
        "copy", "csv", "excel", "pdf", "print", "colvis"
      ]
    };

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
           //console.log(res);
          this.madrasas = res['data'];
          
         // this.dtTrigger.next(null);
        },
        (err) => {
          //console.log(err);
        }
      );

          //jquery style datatable generation

      
    }, 5);


  }

  
}     //end of ngOnInit function


ngAfterViewInit() {
  this.renderer.listen('document', 'click', (event:any ) => {
      if (event.target.hasAttribute("edit-config-id")) {
           this._router.navigate(["/editMadrasa/" + event.target.getAttribute("edit-config-id")]);
          //console.log('edit btn clicked for madrasa ' + event.target.getAttribute("edit-config-id") );
      }
      if (event.target.hasAttribute("view-config-id")) {
           this._router.navigate(["/singleMadrasa/" + event.target.getAttribute("view-config-id")]);
          //console.log('view btn clicked for madrasa ' + event.target.getAttribute("view-config-id") );
      }
  });
}


// ngOnDestroy(): void {
//   this.dtTrigger.unsubscribe();
// }



}   //end of main class
