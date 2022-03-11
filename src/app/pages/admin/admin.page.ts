import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public appPages: any [] = [];

  constructor() { 
    this.appPages = [
      { title: 'Dashboard', url: '/admin/dashboard', icon: 'bar-chart' },
      { title: 'Cuestionarios', url: '/admin/questionnaires', icon: 'help' },
      { title: 'Estudiantes', url: '/admin/students', icon: 'person' },
      { title: 'Grupos', url: '/admin/groups', icon: 'people' },
    ];
  }

  ngOnInit() {
  }

}
