import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyResponse } from './interface/my-response.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {
private url="https://localhost:7155/api/student/"


  constructor(private http:HttpClient) { }

  Register(data:any):Observable<MyResponse>{
    return this.http.post<MyResponse>(`${this.url}register`,data);

  }

  Login(data:any){
    return this.http.post(`${this.url}login`,data);

  }
  getStudents(){
    return this.http.get(`${this.url}students`);
  }
  getAcademicInfo(){
    return this.http.get(`${this.url}academicinfo`);
  }

}
