import { Subject } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { PlayerService } from './../../../../services/player.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit, OnDestroy {
  estudiantes: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serPlayer: PlayerService, private serStorage: LstorageService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };

    const { userId } = this.serStorage.get('user');
    this.serPlayer.getEstudiantes(userId).subscribe(
      resp => {
        this.estudiantes = resp;
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  confirmBox(){
    
  }
}
