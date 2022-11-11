import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  students : Student[]=[];

  dtOptions: any = {};

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }
 

  ngOnInit(): void {

    this.dtOptions = {
      ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllStudents.php',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'title'
      },
      {
        title : 'Address',
        data : 'address'
      },
      {
          title : 'Madrasa',
          data : 'madrasa_id'
      },
      {
          title : 'Course',
          data : 'course_id'
      },
      {
        title : 'ITS Number',
        data : 'its_number'
      },
      {
        title : 'Status',
        data : 'status'
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
    this.admin.getStudents().subscribe(
      (res: any) => {
         console.log(res);
        this.students = res['data'];
        
      },
      (err) => {
        console.log(err);
      }
    );

    
  }, 5);


}



  }

}
