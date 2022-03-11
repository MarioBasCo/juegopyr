import { Subject } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { QuizzService } from './../../../../services/quizz.service';

import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit {
  cuestionarios: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  testModal;

  constructor(private modal: ModalController, private serQuizz: QuizzService, private serStorage: LstorageService) {
  }

  ngOnInit() { 
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };

    const { userId } = this.serStorage.get('user');
    this.serQuizz.getCuestionarios(userId).subscribe(
      resp => {
        this.cuestionarios = resp;
        this.dtTrigger.next();
      }
    )
  }

  save() {
    this.testModal?.toggle()
  }

  confirmBox() {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar?',
      text: '¡No podrá recuperar este dato!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Eliminado!',
          'El dato ha sido eliminado con éxito.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  openModal(element) {

  }
}
