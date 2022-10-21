import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Madrasa } from 'src/app/models/madrasa';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  madrasas : Madrasa[]=[];

  madrasa_count : any = 0;
  principal_count: any = 0;
  teacher_count: any = 0;
  student_count: any = 0;
  course_count: any = 0;
  subject_count: any = 0;

  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';

  constructor(private activatedRoute: ActivatedRoute, private _router : Router, protected admin : AdminService) { }

  ngOnInit(): void 
  {
    setTimeout(() => {
      this.admin.getMadrasas().subscribe(
        (res: any) => {
          console.log(res);
          this.madrasas = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }, 500);

    setTimeout(() => {
      this.admin.getMadrasaCount().subscribe(
        (res: any) => {
          console.log(res);
          this.madrasa_count = res.data[0].Count;
        },
        (err) => {
          console.log(err);
        }
      );
        //for principal count
        this.admin.getPrincipalCount().subscribe(
          (res: any) => {
            console.log(res);
            this.principal_count = res.data[0].Count;
          },
          (err) => {
            console.log(err);
          }
        );

        //for teacher count
        this.admin.getTeacherCount().subscribe(
          (res: any) => {
            console.log(res);
            this.teacher_count = res.data[0].Count;
          },
          (err) => {
            console.log(err);
          }
        );

         //for student count
         this.admin.getStudentCount().subscribe(
          (res: any) => {
            console.log(res);
            this.student_count = res.data[0].Count;
          },
          (err) => {
            console.log(err);
          }
        );

         //for course count
         this.admin.getCourseCount().subscribe(
          (res: any) => {
            console.log(res);
            this.course_count = res.data[0].Count;
          },
          (err) => {
            console.log(err);
          }
        );

        //for subject count
        this.admin.getSubjectCount().subscribe(
          (res: any) => {
            console.log(res);
            this.subject_count = res.data[0].Count;
          },
          (err) => {
            console.log(err);
          }
        );


    }, 500);



    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| 'USER EMAIL NOT FOUND');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| 'ROLE UNDEFINED'); 
    this.currRole = this.currRole.replace(/"/g, '');
          //check username in session storage again not working yet
    this.username = JSON.stringify(sessionStorage.getItem('USER')|| 'USERNAME UNDEFINED'); 
    this.username = this.username.replace(/"/g, '');

    if(this.currRole === "ADMIN"){
      this.noLogin = false;
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "PROFESSOR"){
      this.noLogin = false;
      this.title = "Professor Dashboard";
    }
    else if(this.currRole === "USER"){
      this.noLogin = false;
      this.title = "User Dashboard";
    }
    else if(this.currRole === "ROLE UNDEFINED"){
      this.noLogin = true;
    }
    else {
      this.noLogin = true;
    }

  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  navigateHome()
  {
    if(this.currRole === "ADMIN"){
      this._router.navigate(['/admindashboard']);
    }
    else if(this.currRole === "PROFESSOR"){
      this._router.navigate(['/professordashboard']);
    }
    else if(this.currRole === "USER"){
      this._router.navigate(['/userdashboard']);
    }
    else if(this.currRole === "ROLE UNDEFINED"){
      this._router.navigate(['/']);
    }
    else{
      this._router.navigate(['/']);
    }
  }

}
