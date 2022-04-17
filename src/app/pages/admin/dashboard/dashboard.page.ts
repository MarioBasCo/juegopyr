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
  porcentajeComodin: number = 0;
  estudiantes: number = 0;
  listPromedios: any[] = [];
  listPorcentajes: any[] = [];

  constructor(
    private serStorage: LstorageService,
    private serReport: ReportsService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.cargarInfo();
    console.log(this.listPromedios);

    //this.grafico();
  }

  cargarInfo() {
    const { userId } = this.serStorage.get('user');
    this.serReport.getInfoDasboard(userId).subscribe(
      resp => {
        console.log(resp);
        this.cuestionarios = resp.cuestionarios;
        this.grupos = resp.grupos.total_grupos;
        this.estudiantes = resp.grupos.total_estudiantes;
        this.porcentajeComodin = resp.porcentajeComodin;
        this.cuestionarios_resueltos = resp.cuestionarios_resueltos;
      }
    );
    this.serReport.getAveragesDasboard(userId).subscribe(
      resp => {
        this.listPromedios = resp;
        this.graficarPromedios(this.listPromedios);
      }
    );
    this.serReport.getPorcentajesPromedios(userId).subscribe(
      resp => {
        this.listPorcentajes = resp;
        this.graficoPorcentajes(this.listPorcentajes);
      }
    )
  }

  graficarPromedios(data: any) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: data.map(d => d.codigo),
        datasets: [
          {
            data: data.map(d => d.promedio),
            borderColor: '#3e95cd',
            fill: false,
            label: 'Promedio',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
          },
        ],
      },
    });
  }

  graficoPorcentajes(data: any) {
    this.promedios = new Chart('bar', {
      type: 'pie',
      data: {
        labels: data.map(d => d.detalle.toUpperCase()),
        datasets: [{
          label: '# of Votes',
          data: data.map(d => d.cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
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
