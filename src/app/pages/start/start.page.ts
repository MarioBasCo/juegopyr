import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  factual = new Date();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.router.navigate(['/game']);
  }

}
