import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';
import { Course } from '../models/course';
import { User } from '../models/user';
import { Madrasa } from '../models/madrasa';
import { Subject } from '../models/subject';
import { Topic } from '../models/topic';
import { Video } from '../models/video';
import { Quiz } from '../models/quiz';

// const NAV_URL = environment.apiURL;
const NAV_URL = environment.PHP_BACK_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  

  constructor(private _http : HttpClient) { }

                       
            // real service functions starts here

  //checking existing db functions starts here 

public checkIfEmailExists(email:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/userEmailExists.php?email=`+ email);
}

public checkIfITSNumberExists(its_number:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/studentITSNumberExists.php?its_number=`+ its_number);
}

public checkIfCourseTitle(course_title:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/courseTitleExists.php?course_title=`+ course_title);
}

public checkIfSubjectOfCourseExists(subject_title:any,course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/subjectOfCourseExists.php?subject_title=${subject_title}&course_id=${course_id}`);
}

public checkIfTopicOfSubjectOfCourseExists(topic_title:any,subject_id:any,course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/topicOfSubjectOfCourseExists.php?topic_title=${topic_title}&subject_id=${subject_id}&course_id=${course_id}`);
}

public checkIfVideoOfTopicOfSubjectOfCourseExists(video_title:any,topic_id:any,subject_id:any,course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/videoOfTopicOfSubjectOfCourseExists.php?video_title=${video_title}&topic_id=${topic_id}&subject_id=${subject_id}&course_id=${course_id}`);
}

public checkIfQuizOfTopicOfSubjectOfCourseExists(quiz_title:any,topic_id:any,subject_id:any,course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/validation/quizOfTopicOfSubjectOfCourseExists.php?quiz_title=${quiz_title}&topic_id=${topic_id}&subject_id=${subject_id}&course_id=${course_id}`);
}

  //checking existing db functions ends here




//add stuff functions starts here
public addMadrasa(madrasa :Madrasa){
  return this._http.post<any>(`${NAV_URL}/admins/addMadrasa.php`,madrasa);
}


public addPrincipal(principal:any){
  //  console.log(principal) ;
  return this._http.post<any>(`${NAV_URL}/admins/addPrincipal.php`,principal);
}

public addTeacher(teacher:any){
  //  console.log(teacher) ;
  return this._http.post<any>(`${NAV_URL}/admins/addTeacher.php`,teacher);
}

public addStudent(student:any){
  //  console.log(student) ;
  return this._http.post<any>(`${NAV_URL}/admins/addStudent.php`,student);
}

public addCourse(course:Course){
  //  console.log(course) ;
  return this._http.post<any>(`${NAV_URL}/admins/addCourse.php`,course);
}

public addSubject(subject:Subject){
  //  console.log(subject) ;
  return this._http.post<any>(`${NAV_URL}/admins/addSubject.php`,subject);
}

public addTopic(topic:Topic){
  //  console.log(topic) ;
  return this._http.post<any>(`${NAV_URL}/admins/addTopic.php`,topic);
}

public addVideo(video:Video){
  //  console.log(video) ;
  return this._http.post<any>(`${NAV_URL}/admins/addVideo.php`,video);
}

public addQuiz(quiz:Quiz){
  //  console.log(quiz) ;
  return this._http.post<any>(`${NAV_URL}/admins/addQuiz.php`,quiz);
}



//add stuff functions ends here

//get specific stuff starts here

public getCourseSubjectsSerials(course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getCourseSubjectsSerials.php?course_id=${course_id}`);
}

public getCourseSubjectTopicsSerials(course_id:any,subject_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getCourseSubjectTopicsSerials.php?course_id=${course_id}&subject_id=${subject_id}`);
}

public getCourseSubjectTopicVideosSerials(course_id:any,subject_id:any,topic_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getCourseSubjectTopicVideosSerials.php?course_id=${course_id}&subject_id=${subject_id}&topic_id=${topic_id}`);
}

public getCourseSubjectTopicQuizzesSerials(course_id:any,subject_id:any,topic_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getCourseSubjectTopicQuizzesSerials.php?course_id=${course_id}&subject_id=${subject_id}&topic_id=${topic_id}`);
}

public getSingleCourseSubjects(course_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getSingleCourseSubjects.php?course_id=${course_id}`);
}

public getSingleSubjectTopics(subject_id:any): Observable<any>{
  return this._http.get<any>(`${NAV_URL}/admins/getSingleSubjectTopics.php?subject_id=${subject_id}`);
}


//get specific stuff ends here



    //get all stuff starts here
public  getMadrasas(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllMadrasas.php`);
    }
public  getPrincipals(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllPrincipals.php`);
    }
public  getTeachers(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllTeachers.php`);
    }
public  getCourses(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllCourses.php`);
    }
public  getSubjects(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllSubjects.php`);
    }
public  getTopics(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllTopics.php`);
    }
public  getVideos(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllVideos.php`);
    }
public  getQuizzes(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllQuizzes.php`);
    }
public  getStudents(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllStudents.php`);
    }
public  getJamaats(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllJamaats.php`);
    }
public  getJamiats(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllJamiats.php`);
    }

    //get all functions stuff ends here

                          //count of stuff service functions starts here
public getMadrasaCount(): Observable<any>
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=madrasa`);
}
public getPrincipalCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=principal`);
}
public getTeacherCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=teacher`);
}
public getStudentCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=student`);
}
public getCourseCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=course`);
}
public getSubjectCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=subject`);
}
public getTopicCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=topic`);
}
public getVideoCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=video`);
}
public getQuizCount(): Observable<any> 
{
  return this._http.get<any>(`${NAV_URL}/admins/adminGetCount.php?type=quiz`);
}


                    //count of stuff service functions ends here

                //real service functions ends here
}
