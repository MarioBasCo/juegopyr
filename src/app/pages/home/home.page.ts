import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  factual = new Date();
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.router.navigate(['/start']);
  }
}