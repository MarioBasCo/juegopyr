import { ListResultComponent } from './list-result/list-result.component';
import { ResultComponent } from './result/result.component';
import { DataTablesModule } from 'angular-datatables';
import { FooterModule } from './../../../components/footer/footer.module';
import { HeaderModule } from './../../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    FooterModule,
    DataTablesModule,
    ReportsPageRoutingModule
  ],
  declarations: [ReportsPage, ListResultComponent, ResultComponent]
})
export class ReportsPageModule {}
