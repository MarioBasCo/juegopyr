import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  path_base = environment.webService;

  constructor(private http: HttpClient) { }


  getEstudiantes(id: number){
    const URL = this.path_base + "jugadores/full/" + id;
    return this.http.get<any>(URL);
  }
}
