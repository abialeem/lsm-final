import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';
import { Chapter } from '../models/chapter';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Professor } from '../models/professor';
import { User } from '../models/user';
import { Wishlist } from '../models/wishlist';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private _http : HttpClient) { }


  //test functions start here
  

  //test functions ends here


}
