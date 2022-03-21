import { LstorageService } from './../../../services/lstorage.service';
import { ReportsService } from './../../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  chart: any = [];
  promedios: any = [];
  cuestionarios: number = 0;
  cuestionarios_resueltos: number = 0;
  grupos: number = 0;
  estudiantes: number = 0;

  constructor(
    private serStorage: LstorageService,
    private serReport: ReportsService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.cargarInfo();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#3e95cd',
            fill: false,
            label: 'Coin Price',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
          },
        ],
      },
    });
    this.grafico();
  }

  cargarInfo(){
    const { userId } = this.serStorage.get('user');
    this.serReport.getInfoDasboard(userId).subscribe(
      resp => {
        console.log(resp);
        this.cuestionarios = resp.cuestionarios;
        this.grupos = resp.grupos.total_grupos;
        this.estudiantes = resp.grupos.total_estudiantes;
        this.cuestionarios_resueltos = resp.cuestionarios_resueltos;
      }
    );
  }

  grafico() {
    this.promedios = new Chart('bar', {
      type: 'pie',
      data: {
          labels: ['Regular', 'Bueno', 'Muy Bueno'],
          datasets: [{
              label: '# of Votes',
              data: [5, 14, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        /* scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        } */
    }
  });

  }
}
