import { ReportsService } from './../../../../services/reports.service';
import { QuizzService } from './../../../../services/quizz.service';
import { LstorageService } from './../../../../services/lstorage.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss'],
})
export class ListResultComponent implements OnInit {
  idSelecccionado: number = 0;
  cuestionarios: any[]=[];
  estudiantes: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(
    private serStorage: LstorageService, 
    private serQuizz: QuizzService,
    private serReport: ReportsService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
    this.cargarCuestionario();    
  }
  
  cargarCuestionario(){
    const { userId } = this.serStorage.get('user');
    this.serQuizz.getCuestionarios(userId).subscribe(resp=>{
      console.log(resp);
      this.cuestionarios = resp;
      this.cuestionarios = this.cuestionarios.filter(d => d.estado == 'A');
      this.dtTrigger.next();
    });
  }

  cambiarQuizz(event){
    this.idSelecccionado = event.detail.value;
    this.estudiantes = [];
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });

    this.serReport.getResultados(this.idSelecccionado).subscribe(
      resp => {
        if(resp.status == true){
          this.estudiantes = resp.data;
          this.dtTrigger.next(); 
        }
      }
    )
  }
}
