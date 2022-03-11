import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  factual = new Date();
  codigo: string = '';

  constructor(private router: Router, private serStorage: LstorageService) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.serStorage.set('codigo', this.codigo);
    this.router.navigate(['/start']);
  }
}
