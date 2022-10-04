import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../models/chapter';
import { Course } from '../models/course';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService 
{
  constructor(private _http : HttpClient) { }

  acceptRequestForProfessorApproval(curremail: string): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/acceptstatus/`+curremail);
  }
  
  rejectRequestForProfessorApproval(curremail: string): Observable<any> 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/rejectstatus/`+curremail);
  }
  
  getProfessorList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/professorlist`);
  }

  getYoutubeCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/youtubecourselist`);
  }

  getWebsiteCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/websitecourselist`);
  }

  getCourseListByName(coursename : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/courselistbyname/`+coursename);
  }

  addCourse(course : Course) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/professors/addCourse`,course);
  }

  getProfessorListByEmail(email : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/professors/professorlistbyemail/`+email);
  }

  addNewChapters(chapter : Chapter) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/professors/addnewchapter`,chapter);
  }

  getProfileDetails(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/api/v1/professors/professorprofileDetails/`+loggedUser);
  }
  
  UpdateUserProfile(professor : any):Observable<any>
  {
    return this._http.put<any>(`${NAV_URL}/api/v1/professors/updateprofessor`,professor);
  }
  
  getCourseListNames() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/api/v1/professors/getcoursenames/`);
  }
  
}
