import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// modulos
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
