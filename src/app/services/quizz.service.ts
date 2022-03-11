import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario: string = '';
  descripcion: string = '';
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  private pregunta$ = new Subject<any>();

  url = environment.webService;

  constructor(private http: HttpClient) { }

  enviarObject(data:any){
    this.objectSource.next(data);
  }

  agregarPregunta(pregunta: any) {
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<any> {
    return this.pregunta$.asObservable()
  }

  crearCuestionario(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const URL = this.url + "cuestionarios";
    return this.http.post(URL, data, httpOptions);
  }

  crearPreguntas(data: any) {
    const URL = this.url + "preguntas";
    /* const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data"
      })
    }; */
    return this.http.post(URL, this.objectToFormData(data));
  }

  actulizarEstado(id: number, data: any) {
    const URL = this.url + "cuestionarios/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.patch(URL, data, httpOptions);
  }

  getPregResp(id: number){
    const URL = this.url + "preguntas/"+id;
    return this.http.get<any>(URL);
  }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }
}
