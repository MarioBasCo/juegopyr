import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { objectToFormData } from '../utils/dataForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.webService;

  constructor(private http: HttpClient) { }

  login(data: any){
    const URL = this.url + "usuarios/signin";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.post<any>(URL, data, httpOptions);
  }

  singup(data: any){
    const URL = this.url +  "usuarios/signup";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.post<any>(URL, data, httpOptions);
  }

  forgotPassword(data: any){
    const URL = this.url +  "usuarios/forgot-password";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.post<any>(URL, data, httpOptions);
  }

  resetPassword(data: any){
    const URL = this.url +  "usuarios/reset-password";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.post<any>(URL, data, httpOptions);
  }
}
