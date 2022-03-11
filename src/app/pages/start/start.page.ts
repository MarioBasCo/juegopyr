import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  factual = new Date();
  player_name: string = ''; 

  constructor(private router: Router, private serStorage: LstorageService) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.serStorage.set('player_name', this.player_name);
    this.router.navigate(['/game']);
  }

}
