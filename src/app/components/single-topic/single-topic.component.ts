import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Quiz } from 'src/app/models/quiz';
import { Topic } from 'src/app/models/topic';
import { Video } from 'src/app/models/video';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  topic = new Topic();
  current_topic_id : any = '';

  topic_course = new Course();
  topic_subject = new Subject();
  topic_videos :Video[] = [];
  topic_quizzes :Quiz[] = [];
  topic_data_count = new Topic_data_count();
 
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
      this.current_topic_id = this.activatedRoute.snapshot.paramMap.get("id");
      
      this.admin.getSingleTopic(this.current_topic_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.topic = res['data'][0];
            //get topic course
                 this.admin.getSingleCourse(this.topic.course_id).subscribe(
                     (res: any) => {
                     //console.log(res);
                      this.topic_course= res['data'][0];
                      //console.log(this.topic);
                      },
                    (err) => {
                      //console.log(err);
                      }
                  );
            //get topic subject
            this.admin.getSingleSubject(this.topic.subject_id).subscribe(
              (res: any) => {
              //console.log(res);
               this.topic_subject= res['data'][0];
               //console.log(this.topic);
               },
             (err) => {
               //console.log(err);
               }
           );
            //console.log(this.topic);
          },
          (err) => {
            //console.log(err);
          }
        );

          
        this.admin.getSingleTopicVideos(this.current_topic_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.topic_data_count.video_count = 0;
                this.topic_videos = [];
              }
              else{
            this.topic_videos = res['data'];
            this.topic_data_count.video_count = res['data'].length;
          }
              //console.log(this.subject_videos);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getSingleTopicQuizzes(this.current_topic_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0].id=="null"){
                this.topic_data_count.quiz_count = 0;
                this.topic_quizzes = [];
              }
              else{
            this.topic_quizzes = res['data'];
            this.topic_data_count.quiz_count = res['data'].length;
              }
              //console.log(this.subject_quizzes);
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getTopicVideosSerials(this.current_topic_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0]=="0"){
                this.topic_data_count.topic_videos_serials = [];
              }
              else{
                this.topic_data_count.topic_videos_serials = res['data'];
              }
           
          },
          (err) => {
            //console.log(err);
          }
        );

        this.admin.getTopicQuizzesSerials(this.current_topic_id).subscribe(
          (res: any) => {
              //console.log(res);
              if(res['data'][0]=="0"){
                this.topic_data_count.topic_quizzes_serials = [];
              }
              else{
                this.topic_data_count.topic_quizzes_serials = res['data'];
              }
           
          },
          (err) => {
            //console.log(err);
          }
        );


    }


  }   //end of ngOnInit function

  disableTopic(topic_id:any,subject_id:any){

  }
  disableVideo(video_id:any,topic_id:any){

  }
  disableQuiz(quiz_id:any,topic_id:any){

  }

}   // end of main class

class Topic_data_count {
  video_count : any  = '0';
  quiz_count : any = "0";
  topic_videos_serials :any[] =[];
  topic_quizzes_serials :any[] =[];

 constructor() {}
}
