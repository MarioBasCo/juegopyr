import { CreateGroupComponent } from './create-group/create-group.component';
import { HeaderModule } from './../../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';

import { GroupsPage } from './groups.page';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    DataTablesModule,
    ReactiveFormsModule,
    GroupsPageRoutingModule
  ],
  declarations: [
    GroupsPage,
    ListGroupsComponent,
    CreateGroupComponent
  ]
})
export class GroupsPageModule {}
