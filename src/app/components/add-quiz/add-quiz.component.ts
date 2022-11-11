import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { Topic } from 'src/app/models/topic';
import { Quiz } from 'src/app/models/quiz';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quizExists = false;

  courseIDHasError = true;

  subjectIDHasError = true;

  topicIDHasError = true;

  serialNoHasError = true;


  subjects: Subject[] = [];

  courses: Course[] = [];

  topics: Topic[] = [];

  quiz = new Quiz();

  serials :any[] = [];

  serials_before :any[] = Array.from({length: 10}, (_, i) => i + 1);

  serials_after : any[] = this.serials_before;


  msg = "";
  currRole = '';
  noLogin:boolean = true;
  loggedUser = '';
  username = '';

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
  
      setTimeout(() => {
        this.admin.getCourses().subscribe(
          (res: any) => {
             //console.log(res);
            this.courses = res['data'];
            
          },
          (err) => {
            console.log(err);
          }
        );

    
      }, 5);

    }   //end of if (this.currRole == "ADMIN") 

  } //end of ngOnInit function

  addQuiz():void{

    console.log('add quiz submitted');
    this.admin.addQuiz(this.quiz).subscribe(
    (data: any) => {
          //console.log(data);
          //show success msg to admin user
          this.msg = " Quiz Added Successfully ";
        
    
        },
        (error: { error: any; }) => {
          //console.log(error.error);
          this.msg= error.error.message;
        }
    )
    
    }   //end of addQuiz function
    
    removeMsg():void{
    this.msg = '';
    }

    validateQuizSerialNo(serial_no:any){
      if(serial_no=='null'){
        this.serialNoHasError = true;
      }
      else{
        this.serialNoHasError = false;
      }
    }

  validateTitle(title:any,topic_id:any,subject_id:any,course_id:any){

      //check if quiz title of topic of subject of course exists already in server db
      this.admin.checkIfQuizOfTopicOfSubjectOfCourseExists(title,topic_id,subject_id,course_id).subscribe(
        (res: any) => {
           //console.log(res);
           if(res['result']==0){
            this.quizExists = false;
           }
           else{
            this.quizExists = true;
           }
        
        },
        (err) => {
          console.log(err);
        }
      );
          } //  end of validateTitle function

  validatecourseID(course_id:any){

            if(course_id=='null'){
              this.courseIDHasError = true;
            }
            else{
              this.courseIDHasError = false;

              //now get subjects for the subjects array of this course id
               this.admin.getSingleCourseSubjects(course_id).subscribe(
          (res: any) => {
             //console.log(res);
            this.subjects = res['data'];
            
          },
          (err) => {
            console.log(err);
          }
        );

        this.subjectIDHasError = true;

            }
            this.serialNoHasError = true;

          }   //end of validate courseID function 

  validatesubjectID(subject_id:any){
            if(subject_id=='null'){
              this.subjectIDHasError = true;
            }
            else{
              this.subjectIDHasError = false;

  //now get subjects for the subjects array of this course id
  this.admin.getSingleSubjectTopics(subject_id).subscribe(
    (res: any) => {
       //console.log(res);
      this.topics = res['data'];
      
    },
    (err) => {
      console.log(err);
    }
  );

         this.topicIDHasError = true;

            }
            this.serialNoHasError = true;
          }     //end of validate subject id function

   validatetopicID(topic_id:any){
            if(topic_id=='null'){
              this.topicIDHasError = true;
            }
            else{
              this.topicIDHasError = false;
            }
            this.serialNoHasError = true;
          }     //end of validate subject id function

   getSerials(course_id:any,subject_id:any,topic_id:any){
      
            this.admin.getCourseSubjectTopicQuizzesSerials(course_id,subject_id,topic_id).subscribe(
              (res: any) => {
                 //console.log(res);
                this.serials = res['data'].map(Number);
                
                //console.log(this.serials);
          //after getting serials now generate serials for the options of serial select control
              this.serials_after = this.serials_before.filter( (obj) => {
                return this.serials.indexOf(obj) === -1;
              });
             // console.log(this.serials_after);
              },
              (err) => {
                console.log(err);
              }
            );
      
          }

}
