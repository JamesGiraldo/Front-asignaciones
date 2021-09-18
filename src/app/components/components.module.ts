import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos externos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modulos
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModalComponent } from './modal/modal.component';
import { Form1Component } from './form1/form1.component'


@NgModule({
  declarations: [
    ModalComponent,
    Form1Component
  ],
  exports: [
    ModalComponent,
    Form1Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class ComponentsModule { }
