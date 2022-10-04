import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Wishlist } from '../models/wishlist';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

  getAllUsers() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/`);
  }

  getYoutubeCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/youtubecourselist`);
  }

  getWebsiteCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/websitecourselist`);
  }

  getCourseListByName(coursename : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/courselistbyname/`+coursename);
  }

  enrollNewCourse(enrollment : Enrollment, loggedUser : string, currRole : string) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/users/enrollnewcourse/`+loggedUser+"/"+currRole,enrollment);
  }

  addToWishlist(wishlist : Wishlist) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/users/addtowishlist`,wishlist);
  }

  getEnrollmentStatus(coursename : string, loggedUser : string, currRole : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getenrollmentstatus/`+coursename+"/"+loggedUser+"/"+currRole);
  }

  getEnrollmentByEmail(loggedUser : string, currRole : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getenrollmentbyemail/`+loggedUser+"/"+currRole);
  }

  getWishlistStatus(coursename : string, loggedUser : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getwishliststatus/`+coursename+"/"+loggedUser);
  }

  getWishlistByEmail(loggedUser : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getwishlistbyemail/`+loggedUser);
  }

  getAllWishlist() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getallwishlist`);
  }

  getChappterListByCourseName(coursename : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/v1/users/getchapterlistbycoursename/`+coursename);
  }

  getProfileDetails(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/api/v1/users/userprofileDetails/`+loggedUser);
  }
  
  UpdateUserProfile(user : any):Observable<any>
  {
    return this._http.put<any>(`${NAV_URL}/api/v1/users/updateuser`,user);
  }

}
