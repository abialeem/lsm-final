import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor } from '../models/professor';
import { Admin } from '../models/admin';
import { Chapter } from '../models/chapter';
import { Course } from '../models/course';
import { User } from '../models/user';
import { Madrasa } from '../models/madrasa';

// const NAV_URL = environment.apiURL;
const NAV_URL = environment.PHP_BACK_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private CHAPTERS : Chapter[] = [
    {
      coursename :  'course 1',
    chapter_name :'chapter 1',
    chapter_id : '0001'
    },
    {
      coursename :  'course 1',
    chapter_name :'chapter 2',
    chapter_id : '0002'
    },
    {
      coursename :  'course 1',
    chapter_name :'chapter 3',
    chapter_id : '0003'
    },
    {
      coursename :  'course 2',
    chapter_name :'chapter 1',
    chapter_id : '0004'
    }
  ];

  private COURSES : Course[] = [
{
  coursename :  'course 1',
    courseid :  '0001',
    enrolleddate :  '23-04-2022',
    instructorname :  'professor 1',
    instructorinstitution :  'institute 1',
    enrolledcount :  '2',
    youtubeurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    websiteurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    coursetype :  'quran introduction',
    skilllevel :  '1',
    language :  'english',
    description :  'demo quran introduction course'
},
{
  coursename :  'course 2',
    courseid :  '0002',
    enrolleddate :  '23-08-2022',
    instructorname :  'professor 1',
    instructorinstitution :  'institute 2',
    enrolledcount :  '4',
    youtubeurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    websiteurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    coursetype :  'quran introduction',
    skilllevel :  '3',
    language :  'arabic',
    description :  'demo quran introduction course'
},
{
  coursename :  'course 3',
    courseid :  '0003',
    enrolleddate :  '23-08-2022',
    instructorname :  'professor 3',
    instructorinstitution :  'institute 1',
    enrolledcount :  '4',
    youtubeurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    websiteurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    coursetype :  'quran introduction',
    skilllevel :  '2',
    language :  'arabic',
    description :  'demo quran introduction course'
},
{
  coursename :  'course 4',
    courseid :  '0004',
    enrolleddate :  '23-06-2022',
    instructorname :  'professor 3',
    instructorinstitution :  'institute 3',
    enrolledcount :  '1',
    youtubeurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    websiteurl :  'https://www.youtube.com/watch?v=J73zookBs-c',
    coursetype :  'quran introduction',
    skilllevel :  '2',
    language :  'urdu',
    description :  'demo quran introduction course'
}
  ];
  private ADMINS: Admin[] = [
      {
        username : 'admin1',
        adminid : '0001',
        email : 'admin@admin.com',
        password :  'password'
      },
      {
        username : 'hatim',
        adminid : '0002',
        email : 'hatim@admin.com',
        password :  'password'
      }
  ];
  private USERS: User[] = [
    {
      username : 'User Demo 1',
      userid :  '0001',
      email :  'userdemo1@taalimulquran.com',
      profession :  'student',
      gender :  'male',
      mobile : '0123456789',
      address : 'test address',
      password :  'password'
    },
    {
      username : 'User Demo 2',
      userid :  '0002',
      email :  'userdemo2@taalimulquran.com',
      profession :  'student',
      gender :  'female',
      mobile : '0123456798',
      address : 'test address 2',
      password :  'password'
    },
    {
      username : 'User Demo 3',
      userid :  '0003',
      email :  'userdemo3@taalimulquran.com',
      profession :  'buisness',
      gender :  'male',
      mobile : '0123457689',
      address : 'test address 3',
      password :  'password'
    },
    {
      username : 'User Demo 4',
      userid :  '0004',
      email :  'userdemo4@taalimulquran.com',
      profession :  'worker',
      gender :  'female',
      mobile : '2103456789',
      address : 'test address 4',
      password :  'password'
    }
];

private Professors: Professor[] = [
  {
    professorname :  'professor 1',
    professorid :  '0001',
    email :  'professor1@taalimulquran.com',
    degreecompleted :  'BEd',
    institutionname :  'institute 1',
    department :  'education',
    experience : '2 years',
    gender : 'male',
    mobile :  '9102345678',
    password :  'password',
    status : 'true'
  },
  {
    professorname :  'professor 2',
    professorid :  '0002',
    email :  'professor2@taalimulquran.com',
    degreecompleted :  'BEd',
    institutionname :  'institute 2',
    department :  'education',
    experience : '3 years',
    gender : 'male',
    mobile :  '9102345678',
    password :  'password',
    status : 'true'
  },
  {
    professorname :  'professor 3',
    professorid :  '0003',
    email :  'professor3@taalimulquran.com',
    degreecompleted :  'BEd',
    institutionname :  'institute 3',
    department :  'education',
    experience : '10 years',
    gender : 'female',
    mobile :  '9104345678',
    password :  'password',
    status : 'true'
  },
  {
    professorname :  'professor 4',
    professorid :  '0004',
    email :  'professor4@taalimulquran.com',
    degreecompleted :  'BEd',
    institutionname :  'institute 2',
    department :  'education',
    experience : '12 years',
    gender : 'male',
    mobile :  '9112345678',
    password :  'password',
    status : 'true'
  },
  
  
];
  professor = new Professor();

  constructor(private _http : HttpClient) { }

                        //fake service functions starts here
                        getTotalUsers(): User[] {
                          return this.USERS;
                      } 

                      getTotalProfessors(): Professor[] {
                        return this.Professors;
                    } 

                    getTotalCourses(): Course[] {
                        return this.COURSES;
                    }
                    getTotalWishlist(): any[]{
                        return [0];
                    }
                    getTotalEnrollments(): any[]{
                      return [0];
                  }
                  getTotalEnrollmentCount(): any{
                    return 2;
                }
                getTotalChapters(): Chapter[] {
                  return this.CHAPTERS;
              } 
                        //fake service functions ends here

            // real service functions starts here



    //get all stuff starts here
public  getMadrasas(): Observable<any> {
      return this._http.get<any>(`${NAV_URL}/admins/getAllMadrasas.php`);
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














  public addProfessor(professor : Professor):Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/v1/admins/addProfessor`,professor);
  }

  // getTotalProfessors(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalprofessors`);
  // }

  // getTotalUsers(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalusers`);
  // }

  // getTotalCourses(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalcourses`);
  // }

  // getTotalWishlist(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalwishlist`);
  // }

  // getTotalEnrollments(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalenrollments`);
  // }

  // getTotalEnrollmentCount(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalenrollmentcount`);
  // }

  // getTotalChapters(): Observable<any[]> | undefined 
  // {
  //   return this._http.get<any>(`${NAV_URL}/api/v1/admins/gettotalchapters`);
  // }

                //real service functions ends here
}
