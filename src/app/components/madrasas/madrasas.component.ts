import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';

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
 
  
  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 3,
    //   processing: true,
    //   dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ],
        
    // };

    this.dtOptions = {
      ajax: 'http://127.0.0.1/t_q_back/api/admins/getAllMadrasas.php',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'madrasa_title'
      }, {
        title: 'Address',
        data: 'madrasa_address'
      }, {
        title: 'Jamiat',
        data: 'madrasa_jamiat_id'
      }, {
        title: 'Jamaat',
        data: 'madrasa_jamaat_id'
      },
      {
        title: 'Student(s) Count',
        data: 'madrasa_student_count'
      },
      {
        title: 'Teacher(s) Count',
        data: 'madrasa_teacher_count'
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
      this.admin.getMadrasas().subscribe(
        (res: any) => {
           console.log(res);
          this.madrasas = res['data'];
          
        },
        (err) => {
          console.log(err);
        }
      );

          //jquery style datatable generation

      // $ ( document ).ready(function() {
      //   $.ajax({
      //       type: 'GET',
      //       url: 'http://127.0.0.1/t_q_back/api/admins/getAllMadrasas.php',
      //       mimeType: 'json',
      //       success: function(data) {
      //           $.each(data['data'], function(i, data) {
      //               var body = "<tr>";
      //               body    += "<td>" + data.id + "</td>";
      //               body    += "<td>" + data.madrasa_title + "</td>";
      //               body    += `<td> <p><span>Address </span> <span class='text-info' style='text-transform:capitalize'>${data.madrasa_address}</span></p>
      //               <p><span>Jamiat </span> <span class='text-info' style='text-transform:capitalize'>${data.madrasa_jamiat_id }</span></p>
      //               <p><span>Jamaat </span> <span class='text-info' style='text-transform:capitalize'>${ data.madrasa_jamaat_id}</span></p></td>`;
      //               body    += "<td><p><span>Student's Count </span> <span class='badge badge-primary'>"+ data.madrasa_student_count +"</span></p><p><span>Teacher's Count </span> <span class='badge badge-primary'>"+ data.madrasa_teacher_count +"</span></p></td>";
      //               body    += "<td>Actions here</td>";
      //               body    += "</tr>";
      //               $( "#example1 tbody" ).append(body);
      //               $("#example1").DataTable({});
      //               // $("#example1").DataTable({
      //               //     "responsive": true, "lengthChange": false, "autoWidth": false, "paging": true, "ordering": true,
      //               //     "info": true,"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      //               //   }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      //           });
      //           /*DataTables instantiation.*/
      //           // $( "#example1" ).DataTable({
      //           //   "responsive": true,
      //           //   "lengthChange": false,
      //           //   "autoWidth": false,
      //           //   "paging": true,
      //           //   "ordering": true,
      //           //    "info": true,
      //           //    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      //           // });

                
      //       },
      //       error: function() {
      //           alert('Fail!');
      //       }
      //   });
      //   });
      
    }, 5);


  }


}


// ngOnDestroy(): void {
//   this.dtTrigger.unsubscribe();
// }

}
