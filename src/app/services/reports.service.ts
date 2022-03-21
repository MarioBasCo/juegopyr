import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  path_base = environment.webService;

  constructor(private http: HttpClient) { }

  getInfoDasboard(id: number){
    const  URL = this.path_base + "reportes/"+id;
    return this.http.get<any>(URL);
  }
}