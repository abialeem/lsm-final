import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from 'src/app/models/principal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-principals',
  templateUrl: './principals.component.html',
  styleUrls: ['./principals.component.css']
})
export class PrincipalsComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  principals : Principal[]=[];

  dtOptions: any = {};

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService, private renderer: Renderer2) { }

  ngOnInit(): void {

  this.dtOptions = {
    ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllPrincipals.php',
    columns: [{
      title: 'ID',
      data: 'id'
    }, {
      title: 'Title',
      data: 'title',
      render: function (data:any) {
        data = '<span class="text-default" style="font-size:14px;text-transform:capitalize;font-weight:bold;">'+ data +'</span>';
            return data;
    },
    }, {
      title: 'Address',
      data: 'address',
      render: function (data:any) {
        data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
            return data;
    },
    }, {
      title: 'Madrasa',
      data: 'madrasa',
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
    responsive: true,
    deferRender: true,
    // Configure the buttons
    buttons: [
      "copy", "csv", "excel", "pdf", "print", "colvis"
      // {
      //   text: 'Some button',
      //   key: '1',
      //   action: function (e, dt, node, config) {
      //     alert('Button activated');
      //   }
      // }
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
    this.admin.getPrincipals().subscribe(
      (res: any) => {
         console.log(res);
        this.principals = res['data'];
        
      },
      (err) => {
        console.log(err);
      }
    );

    
  }, 5);


}


}     //ngOnInit function ends here

ngAfterViewInit() {
  this.renderer.listen('document', 'click', (event:any ) => {
      if (event.target.hasAttribute("edit-config-id")) {
           this._router.navigate(["/editPrincipal/" + event.target.getAttribute("edit-config-id")]);
          //console.log('edit btn clicked for madrasa ' + event.target.getAttribute("edit-config-id") );
      }
      if (event.target.hasAttribute("view-config-id")) {
           this._router.navigate(["/singlePrincipal/" + event.target.getAttribute("view-config-id")]);
          //console.log('view btn clicked for madrasa ' + event.target.getAttribute("view-config-id") );
      }
  });
}


}
