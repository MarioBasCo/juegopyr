import { LstorageService } from './../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayGuard implements CanLoad {
  constructor(
    private serStorage: LstorageService, 
    private router: Router){
  }
  
  canLoad(): boolean {
    let quizz = this.serStorage.get('quizz');
    let student = this.serStorage.get('estudiante');
    let cargado = this.serStorage.get('cargado');
    if(quizz && student && cargado){
      this.router.navigateByUrl('/game', { replaceUrl: true });
      return false;
    } else{
      return true;
    }
  }
}
