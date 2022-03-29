import { LstorageService } from './../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanLoad {
  constructor(
    private serStorage: LstorageService, 
    private router: Router){
  }
  
  canLoad(): boolean {
    let quizz = this.serStorage.get('quizz');
    let estudiante = this.serStorage.get('estudiante');
    if (quizz && estudiante){
      this.router.navigateByUrl('/play', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }
}
