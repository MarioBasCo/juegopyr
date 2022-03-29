import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comodin-result',
  templateUrl: './comodin-result.page.html',
  styleUrls: ['./comodin-result.page.scss'],
})
export class ComodinResultPage implements OnInit {
  data: any;
  
  constructor(private router: Router, private serStorage: LstorageService) { }

  ngOnInit() {
    this.data = this.serStorage.get('calf');
  }

  cerrar(){
    this.serStorage.clear();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
