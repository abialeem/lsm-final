import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Quiz } from 'src/app/models/quiz';
import { Subject } from 'src/app/models/subject';
import { Topic } from 'src/app/models/topic';
import { Video } from 'src/app/models/video';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-singlecourse',
  templateUrl: './singlecourse.component.html',
  styleUrls: ['./singlecourse.component.css']
})
export class SinglecourseComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  course = new Course();
  current_course_id : any = '';

  course_subjects :Subject[] = [];
  course_topics :Topic[] = [];
  course_videos :Video[] = [];
  course_quizzes :Quiz[] = [];

  course_data_count = new Course_data_count();

  

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
      this.current_course_id = this.activatedRoute.snapshot.paramMap.get("id");
      
      this.admin.getSingleCourse(this.current_course_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.course = res['data'][0];
            //console.log(this.course);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleCourseSubjects(this.current_course_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.course_data_count.subject_count = 0;
                this.course_subjects = [];

              }
              else{
            this.course_subjects = res['data'];
            this.course_data_count.subject_count = res['data'].length;
              }
              //console.log(this.course_subjects);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleCourseTopics(this.current_course_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.course_data_count.topic_count = 0;
                this.course_topics = [];

              }
              else{
                this.course_data_count.topic_count = res['data'].length;
                this.course_topics = res['data'];
              }
           
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleCourseVideos(this.current_course_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.course_data_count.video_count = 0;
                this.course_videos = [];

              }
              else{
                this.course_data_count.video_count = res['data'].length;
                this.course_videos = res['data'];
              }
            
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleCourseQuizzes(this.current_course_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.course_data_count.quiz_count = 0;
                this.course_quizzes = [];

              }
              else{
                this.course_data_count.quiz_count = res['data'].length;
                this.course_quizzes = res['data'];
              }
            
          },
          (err) => {
            //console.log(err);
          }
        );

          this.admin.getCourseSubjectsSerials(this.current_course_id).subscribe(
            (res: any) => {
                //console.log(res);
                if(res['data'][0]=="0"){
                  this.course_data_count.course_subjects_serials = [] ;
                }
                else{
              this.course_data_count.course_subjects_serials = res['data'];
                }
            },
            (err) => {
              //console.log(err);
            }
          );

      }

      

  }   //  ngOnInit function ends here

  disableSubject(subject_id:any,course_id:any){

  }

  disableTopic(topic_id:any,course_id:any){

  }
  disableVideo(video_id:any,course_id:any){

  }
  disableQuiz(quiz_id:any,course_id:any){

  }

}   // end of main class

class Course_data_count {
  subject_count : any = '0';
  topic_count : any = '0';
  video_count : any  = '0';
  quiz_count : any = "0";
  course_subjects_serials :any[] =[];
 
 constructor() {}
}
  