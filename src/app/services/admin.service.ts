import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor } from '../models/professor';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  professor = new Professor();

  constructor(private _http : HttpClient) { }

  public addProfessor(professor : Professor):Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/admins/addProfessor`,professor);
  }

  getTotalProfessors(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalprofessors`);
  }

  getTotalUsers(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalusers`);
  }

  getTotalCourses(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalcourses`);
  }

  getTotalWishlist(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalwishlist`);
  }

  getTotalEnrollments(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalenrollments`);
  }

  getTotalEnrollmentCount(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalenrollmentcount`);
  }

  getTotalChapters(): Observable<any[]> | undefined 
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalchapters`);
  }

}
