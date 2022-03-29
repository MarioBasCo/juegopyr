import { ReportsService } from './../../../services/reports.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LstorageService } from './../../../services/lstorage.service';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {


  constructor() { }

  ngOnInit() {

  }

}
