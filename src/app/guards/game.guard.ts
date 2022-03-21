import { LstorageService } from './../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanLoad {
  
  constructor(private serStorage: LstorageService, private router: Router){

  }
  
  canLoad(): boolean {
    let quizz = this.serStorage.get('quizz');
    let student = this.serStorage.get('estudiante');
    if(quizz && student){
      return true;
    } else{
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
