import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Quiz } from 'src/app/models/quiz';
import { Topic } from 'src/app/models/topic';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-quiz',
  templateUrl: './single-quiz.component.html',
  styleUrls: ['./single-quiz.component.css']
})
export class SingleQuizComponent implements OnInit {
  noLogin:boolean = true;
  loggedUser = '';
  currRole = '';
  title = '';
  username = '';
  msg = "";

  quiz = new Quiz();
  current_quiz_id : any = '';

  quiz_course = new Course();
  quiz_subject = new Subject();
  quiz_topic = new Topic();
  quiz_data_count = new Quiz_data_count();
 
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
      this.current_quiz_id = this.activatedRoute.snapshot.paramMap.get("id");

      this.admin.getSingleQuiz(this.current_quiz_id).subscribe(
        (res: any) => {
           //console.log(res);
          this.quiz = res['data'][0];
          //console.log(this.quiz);
            //get quiz course
                 this.admin.getSingleCourse(this.quiz.course_id).subscribe(
                     (res: any) => {
                     //console.log(res);
                      this.quiz_course= res['data'][0];
                      //console.log(this.quiz_course);
                      },
                    (err) => {
                      //console.log(err);
                      }
                  );
            //get video subject
            this.admin.getSingleSubject(this.quiz.subject_id).subscribe(
              (res: any) => {
              //console.log(res);
               this.quiz_subject= res['data'][0];
               //console.log(this.quiz_subject);
               },
             (err) => {
               //console.log(err);
                }
                 );
            //get video topic
            this.admin.getSingleTopic(this.quiz.topic_id).subscribe(
              (res: any) => {
              //console.log(res);
               this.quiz_topic= res['data'][0];
               //console.log(this.quiz_topic);
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


  } //end of ngOnInit function here

  disableQuiz(quiz_id:any){

  }

}   // end of main class

class Quiz_data_count {
  attachment_count : any  = '0';
  question_count : any = '0';
 constructor() {}
}
 