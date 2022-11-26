import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  courses : Course[]=[];

  dtOptions: any = {};

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService, private renderer: Renderer2) { }

  ngOnInit(): void {


    this.dtOptions = {
      ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllCourses.php',
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
      },
      {
        title: 'Description',
        data: 'description',
        render: function (data:any) {
          data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
      },
      {
        title: 'Course Type',
        data: 'course_type',
        render: function (data:any) {
          data = '<span class="badge badge-primary p-2" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
      },
      {
        title: 'Skill Level',
        data: 'skill_level',
        render: function (data:any) {
          data = '<span class="badge badge-success p-2" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              return data;
      },
      },
      {
          title : 'Language',
          data : 'language',
          render: function (data:any) {
                if(data === "urdu"){
                  data = '<span class="text-info" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
                }
                else{
                  data = '<span class="text-secondary" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
                }
           
                return data;
        },
      },
      {
        title : 'Subject Count',
        data : 'subjects_count',
        render: function (data:any) {
              if(data === "0"){
                data = '<span class="badge badge-danger p-2" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              }
              else{
                data = '<span class="badge badge-success p-2" style="font-size:14px;text-transform:capitalize;">'+ data +'</span>';
              }
         
              return data;
      },
    }, 
      {
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
     <i class='fa fa-eye pointer'  title='View Course' view-config-id="${data}"></i>
     <i class='fa fa-edit pointer' title='Edit Course' edit-config-id="${data}"></i>
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
      this.admin.getCourses().subscribe(
        (res: any) => {
           console.log(res);
          this.courses = res['data'];
          
        },
        (err) => {
          console.log(err);
        }
      );
  
      
    }, 5);
  
  
  }
  
  

  }     //  ngOnInit function ends here

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event:any ) => {
        if (event.target.hasAttribute("edit-config-id")) {
             this._router.navigate(["/editCourse/" + event.target.getAttribute("edit-config-id")]);
            //console.log('edit btn clicked for madrasa ' + event.target.getAttribute("edit-config-id") );
        }
        if (event.target.hasAttribute("view-config-id")) {
             this._router.navigate(["/singleCourse/" + event.target.getAttribute("view-config-id")]);
            //console.log('view btn clicked for madrasa ' + event.target.getAttribute("view-config-id") );
        }
    });
  }

}
