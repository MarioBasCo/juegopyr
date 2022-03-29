import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit  {
  contador: number = 3;
  setInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.playContadorInicial();
  }
  
  ionViewWillLeave() {
    clearInterval(this.setInterval);
  }

  playContadorInicial() {
    this.setInterval = setInterval(() => {
      console.log('hola');
      if(this.contador === 0) {
        this.router.navigate(['/game']);
      } else {
        this.contador = this.contador - 1;
      }
    }, 1000)
  }
}
