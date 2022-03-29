import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comodin',
  templateUrl: './comodin.page.html',
  styleUrls: ['./comodin.page.scss'],
})
export class ComodinPage implements OnInit {
  data: any;

  constructor(private router: Router, private serStorage: LstorageService) { }

  ngOnInit() {
    this.data = this.serStorage.get('calf');
  }

  irAComodin(){
    this.router.navigateByUrl('/comodin-question', { replaceUrl: true });
  }

  cerrar(){
    this.serStorage.clear();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
