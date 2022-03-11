
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
  testModal;

  constructor(private modal: ModalController) {
    this.cuestionarios = [
      {
        titulo: "Sinonimos y antonimos",
        codigo: "1",
        preg: "5"
      },
      {
        titulo: "Tipos de Adjetivos",
        codigo: "2",
        preg: "5"
      },
      {
        titulo: "Complementos del Predicado",
        codigo: "3",
        preg: "5"
      },
      {
        titulo: "Pronombres",
        codigo: "4",
        preg: "5"
      }
    ];
  }

  ngOnInit() { }

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
