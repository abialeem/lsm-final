import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  subjects : Subject[]=[];

  dtOptions: any = {};

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void {

  this.dtOptions = {
    ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllSubjects.php',
    columns: [{
      title: 'ID',
      data: 'id'
    }, {
      title: 'Title',
      data: 'title'
    },
    {
      title: 'Description',
      data: 'description'
    },
     {
      title : 'Course',
      data : 'course_id'
    },
    {
      title : 'Serial No',
      data : 'serial_no'
    },{
      title : 'Topic Count',
      data : 'topic_count'
    }
  ],
    // Declare the use of the extension in the dom parameter
    dom: 'Bfrtip',
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
    this.admin.getSubjects().subscribe(
      (res: any) => {
         console.log(res);
        this.subjects = res['data'];
        
      },
      (err) => {
        console.log(err);
      }
    );

    
  }, 5);


}


}

}
