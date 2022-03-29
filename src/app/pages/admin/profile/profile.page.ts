import { LstorageService } from './../../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(private serStorage: LstorageService) { }

  ngOnInit() {
    this.user = this.serStorage.get('user');
  }

  openEdit(){
    
  }
}
