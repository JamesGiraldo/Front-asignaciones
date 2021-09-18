import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser';

// modulos externos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// componentes
import { DashboardComponent } from './dashboard/dashboard.component';

import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasswordComponent } from './password/password.component';

import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { CursoComponent } from './mantenimientos/cursos/curso/curso.component';
import { FormComponent } from './mantenimientos/cursos/form/form.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario/usuario.component';
import { FormUserComponent } from './mantenimientos/usuarios/form/form.component';

import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante/estudiante.component';

import { PostsComponent } from './mantenimientos/posts/posts.component';
import { FormPostsComponent } from './mantenimientos/posts/form/form.component';
import { PostComponent } from './mantenimientos/posts/post/post.component';

import { AsignacionComponent } from './mantenimientos/asignacion/asignacion.component';

import { RolesComponent } from './mantenimientos/roles/roles.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    MantenimientosComponent,
    CursosComponent,
    CursoComponent,
    FormComponent,
    EstudiantesComponent,
    EstudianteComponent,
    UsuariosComponent,
    FormUserComponent,
    UsuarioComponent,
    PostsComponent,
    FormPostsComponent,
    PostComponent,
    RolesComponent,
    PerfilComponent,
    PasswordComponent,
    AsignacionComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    MantenimientosComponent,
    CursosComponent,
    CursoComponent,
    FormComponent,
    EstudiantesComponent,
    EstudianteComponent,
    UsuariosComponent,
    FormUserComponent,
    UsuarioComponent,
    PostsComponent,
    FormPostsComponent,
    PostComponent,
    RolesComponent,
    PerfilComponent,
    PasswordComponent,
    AsignacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ComponentsModule,
    SharedModule,
    BrowserModule,
  ]
})
export class PagesModule { }
