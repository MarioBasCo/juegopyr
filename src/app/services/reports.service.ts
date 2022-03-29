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

  getAveragesDasboard(id: number){
    const  URL = this.path_base + "reportes/averages/"+id;
    return this.http.get<any>(URL);
  }

  getPorcentajesPromedios(id: number){
    const  URL = this.path_base + "reportes/percentages/"+id;
    return this.http.get<any>(URL);
  }

  getResultados(id: number){
    const URL = this.path_base + "reportes/resultados/" + id;
    return this.http.get<any>(URL);
  }


  getResultadoById(id: number){
    const URL = this.path_base + "reportes/resultados/search/" + id;
    return this.http.get<any>(URL);
  }
}
