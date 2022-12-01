import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Topic } from 'src/app/models/topic';
import { Video } from 'src/app/models/video';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css']
})
export class SingleVideoComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  video = new Video();
  current_video_id : any = '';

  video_course = new Course();
  video_subject = new Subject();
  video_topic = new Topic();
  video_data_count = new Video_data_count();


  apiLoaded = false;
 
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
      this.current_video_id = this.activatedRoute.snapshot.paramMap.get("id");

      this.admin.getSingleVideo(this.current_video_id).subscribe(
        (res: any) => {
           //console.log(res);
          this.video = res['data'][0];
          //console.log(this.video);
            //get video course
                 this.admin.getSingleCourse(this.video.course_id).subscribe(
                     (res: any) => {
                     //console.log(res);
                      this.video_course= res['data'][0];
                      //console.log(this.video.video_src);
                      //console.log(this.video_course);
                      },
                    (err) => {
                      //console.log(err);
                      }
                  );
            //get video subject
            this.admin.getSingleSubject(this.video.subject_id).subscribe(
              (res: any) => {
              //console.log(res);
               this.video_subject= res['data'][0];
               //console.log(this.video_subject);
               },
             (err) => {
               //console.log(err);
                }
                 );
            //get video topic
            this.admin.getSingleTopic(this.video.topic_id).subscribe(
              (res: any) => {
              //console.log(res);
               this.video_topic= res['data'][0];
               //console.log(this.video_topic);
               },
             (err) => {
               //console.log(err);
                }
                 );
        },
        (err) => {
          //console.log(err);
        }
      );

    }   //admin check if ends here

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  } //end of ngOnInit function here

  disableVideo(video_id:any){

  }

}   // end of main class

class Video_data_count {
  attachment_count : any  = '0';
 constructor() {}
}
