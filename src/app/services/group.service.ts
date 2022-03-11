import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  path_base = environment.webService;

  constructor(private http: HttpClient) { }

  getGrupos(id: number) {
    const URL = this.path_base + "grupos/usuarios/" + id;
    return this.http.get<any>(URL);
  }

  getOne(id: number){
    const URL = this.path_base + "grupos/" + id;
    return this.http.get<any>(URL);
  }

  createGroup(data: any){
    const URL = this.path_base + "grupos";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.post<any>(URL, data, httpOptions);
  }

  editGroup(id: number, data: any){
    const URL = this.path_base + "grupos/"+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8' 
      })
    };
    return this.http.patch<any>(URL, data, httpOptions);
  }
}
