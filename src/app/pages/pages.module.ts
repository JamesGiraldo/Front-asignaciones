import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// modulos externos
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// modulos
import { SharedModule } from '../shared/shared.module';

// componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { PostsComponent } from './mantenimientos/posts/posts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    MantenimientosComponent,
    CursosComponent,
    EstudiantesComponent,
    UsuariosComponent,
    PostsComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    MantenimientosComponent,
    CursosComponent,
    EstudiantesComponent,
    UsuariosComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
  ]
})
export class PagesModule { }
