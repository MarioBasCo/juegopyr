import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {

  constructor(private router: Router, private serStorage: LstorageService) { }

  ngOnInit() {
  }

  cerrar(){
    this.serStorage.clear();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
