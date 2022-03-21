import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public appPages: any [] = [];
  usuario: string = '';

  constructor(private serStorage: LstorageService) { 
    this.appPages = [
      { title: 'Dashboard', url: '/admin/dashboard', icon: 'bar-chart' },
      { title: 'Grupos', url: '/admin/groups', icon: 'people' },
      { title: 'Estudiantes', url: '/admin/students', icon: 'person' },
      { title: 'Cuestionarios', url: '/admin/questionnaires', icon: 'help' },
    ];
  }

  ngOnInit() {
    const { nombre, apellido } = this.serStorage.get('user');
    this.usuario = `${nombre} ${apellido}`
  }

}
