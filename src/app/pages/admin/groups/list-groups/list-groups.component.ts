import { Subject } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { GroupService } from './../../../../services/group.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
})
export class ListGroupsComponent implements OnInit, OnDestroy {
  grupos: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serGrupos: GroupService, private serStorage: LstorageService) { }

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
    this.serGrupos.getGrupos(userId).subscribe(
      resp => {
        this.grupos = resp;
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  confirmBox(){
    
  }
}
