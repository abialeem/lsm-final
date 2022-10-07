import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = new User();
  professor = new Professor();
  admin = new Admin();

  constructor(private _http : HttpClient) { }
  
  public loginUserFromRemote(user : User)
  {
  return this._http.post<any>(`${NAV_URL}/api/v1/auth/loginuser`,user).pipe(
    map(
      data => {
        sessionStorage.setItem('USER', user.email);
        sessionStorage.setItem('USERNAME', user.username);
        sessionStorage.setItem('ROLE', 'USER');
        sessionStorage.setItem('TOKEN', `Bearer ${data.token}`);
        return data;
        }
      )
    );        
  }

  public loginProfessorFromRemote(professor : Professor)
  {
    console.log(professor);
    return this._http.post<any>(`${NAV_URL}/api/v1/auth/loginprofessor`,professor).pipe(
    map(
      data => {
        sessionStorage.setItem('USER', professor.email);
        sessionStorage.setItem('USERNAME', professor.professorname);
        sessionStorage.setItem('ROLE', 'PROFESSOR');
        sessionStorage.setItem('TOKEN', `Bearer ${data.token}`);
        return data;
        }
      )
    ); 
  }

  public adminLoginFromRemote(admin : Admin)
  {
  console.log(admin);
  return this._http.post<any>(`${NAV_URL}/api/v1/auth/loginadmin`,admin).pipe(
    map(
      data => {
        sessionStorage.setItem('USER', admin.email);
        sessionStorage.setItem('USERNAME', admin.username);
        sessionStorage.setItem('ROLE', 'ADMIN');
        sessionStorage.setItem('TOKEN', `Bearer ${data.token}`);
        return data;
        }
      )
    ); 
  }



isUserLoggedIn()
{
  let user = sessionStorage.getItem('USER');
  if(user === null || user.length === 0) 
  {
      return false;
  }
  return true;
}

isProfessorLoggedIn()
{
  let user = sessionStorage.getItem('USER');
  if(user === null || user.length === 0) 
  {
      return false;
  }
  return true;
}

isAdminLoggedIn()
{
  let user = sessionStorage.getItem('USER');
  if(user === null || user.length === 0) 
  {
      return false;
  }
  return true;
}

getAuthenticatedToken() {
  return sessionStorage.getItem('TOKEN');
}

getAuthenticatedUser() {
  return sessionStorage.getItem('USER');
}

userType() {
    return sessionStorage.getItem('ROLE');
}

}

