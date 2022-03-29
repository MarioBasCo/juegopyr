import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-game',
  templateUrl: './header-game.component.html',
  styleUrls: ['./header-game.component.scss'],
})
export class HeaderGameComponent implements OnInit {
  player_name: string = '';

  constructor(private serStorage: LstorageService) { }

  ngOnInit() {
    const { player_name } = this.serStorage.get('estudiante');
    this.player_name = player_name
  }

}
