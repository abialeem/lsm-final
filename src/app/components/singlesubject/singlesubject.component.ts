import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Quiz } from 'src/app/models/quiz';
import { Subject } from 'src/app/models/subject';
import { Topic } from 'src/app/models/topic';
import { Video } from 'src/app/models/video';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-singlesubject',
  templateUrl: './singlesubject.component.html',
  styleUrls: ['./singlesubject.component.css']
})
export class SinglesubjectComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  subject = new Subject();
  current_subject_id : any = '';

  subject_course = new Course();
  subject_topics :Topic[] = [];
  subject_videos :Video[] = [];
  subject_quizzes :Quiz[] = [];
  subject_data_count = new Subject_data_count();
 
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
      this.current_subject_id = this.activatedRoute.snapshot.paramMap.get("id");
      
      this.admin.getSingleSubject(this.current_subject_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.subject = res['data'][0];
            //console.log(this.subject);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleSubjectTopics(this.current_subject_id).subscribe(
          (res: any) => {
             // console.log(res);
            
            if(res['data'][0].id=="null"){
              this.subject_data_count.topic_count = 0;
              this.subject_topics = [];
            }
            else{
              this.subject_topics = res['data'];
            this.subject_data_count.topic_count = res['data'].length;
            }
              //console.log(this.subject_topics);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleSubjectVideos(this.current_subject_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.subject_data_count.video_count = 0;
                this.subject_videos = [];
              }
              else{
            this.subject_videos = res['data'];
            this.subject_data_count.video_count = res['data'].length;
          }
              //console.log(this.subject_videos);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleSubjectQuizzes(this.current_subject_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.subject_data_count.quiz_count = 0;
                this.subject_quizzes = [];
              }
              else{
            this.subject_quizzes = res['data'];
            this.subject_data_count.quiz_count = res['data'].length;
              }
              //console.log(this.subject_quizzes);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSubjectTopicsSerials(this.current_subject_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0]=="0"){
                this.subject_data_count.subject_topics_serials = [];
              }
              else{
                this.subject_data_count.subject_topics_serials = res['data'];
              }
           
          },
          (err) => {
            //console.log(err);
          }
        );



    }         // admin check ends here

    


  } //end of ngOnInit function

  disableSubject(subject_id:any,course_id:any){

  }
  disableTopic(topic_id:any,subject_id:any){

  }
  disableVideo(video_id:any,subject_id:any){

  }
  disableQuiz(quiz_id:any,subject_id:any){

  }

}   // end of main class

class Subject_data_count {
  topic_count : any = '0';
  video_count : any  = '0';
  quiz_count : any = "0";
  subject_topics_serials :any[] =[];
 
 constructor() {}
}
