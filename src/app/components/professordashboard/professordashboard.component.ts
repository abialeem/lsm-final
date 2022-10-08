import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { Course } from 'src/app/models/course';
import { Enrollment } from 'src/app/models/enrollment';
import { Professor } from 'src/app/models/professor';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-professordashboard',
  templateUrl: './professordashboard.component.html',
  styleUrls: ['./professordashboard.component.css']
})
export class ProfessordashboardComponent implements OnInit {

  loggedUser = '';
  currRole = '';
  // courses : Observable<any[]> | undefined;
  // enrollments : Observable<any[]> | undefined;
  // enrollmentcount : Observable<any[]> | undefined;
  // wishlist : Observable<any[]> | undefined;
  // chapters : Observable<any[]> | undefined;
  professors : Professor[] | undefined;
  users : User[] | undefined;
  usercount = 0 ;
  courses : Course[] | undefined;
  enrollments : Enrollment[] | undefined;
  enrollmentcount : any[] | undefined;
  wishlist : Wishlist[] | undefined;
  chapters : Chapter[] | undefined;
  
  constructor(private _service : AdminService) {}


  ngOnInit(): void 
  {

    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#btn").click(function(){
      $(".sidebar").toggleClass("open");
      menuBtnChange();
    });
    
    $(".bx-search").click(function(){ 
      $(".sidebar").toggleClass("open");
      menuBtnChange(); 
    });
    
    function menuBtnChange() {
     if($(".sidebar").hasClass("open")){
      $("#btn").removeClass("fa-bars").addClass("fa-ellipsis-v");
     }else {
      $("#btn").removeClass("fa-ellipsis-v").addClass("fa-bars");
     }
    }

    this.courses = this._service.getTotalCourses();
    this.enrollments = this._service.getTotalEnrollments();
    this.enrollmentcount = this._service.getTotalEnrollmentCount();
    this.wishlist = this._service.getTotalWishlist();
    this.chapters = this._service.getTotalChapters();

  }

}
