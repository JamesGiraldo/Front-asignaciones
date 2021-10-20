import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasswordComponent } from './password/password.component';

// mantenimientos
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';

import { AsignacionComponent } from './mantenimientos/asignacion/asignacion.component';

import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { FormComponent } from './mantenimientos/cursos/form/form.component';

import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante/estudiante.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario/usuario.component';
import { FormUserComponent } from './mantenimientos/usuarios/form/form.component';

import { PostsComponent } from './mantenimientos/posts/posts.component';
import { PostComponent } from './mantenimientos/posts/post/post.component';
import { FormPostsComponent } from './mantenimientos/posts/form/form.component';

import { RolesComponent } from './mantenimientos/roles/roles.component';
import { CursoComponent } from './mantenimientos/cursos/curso/curso.component';

import { ChatComponent } from './chat/chat.component';

const childRoutes: Routes = [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
      { path: 'password', component: PasswordComponent, data: { titulo: 'Cambiar password' } },

      // Mantenimientos
      { path: 'mantenimiento', component: MantenimientosComponent, data: { titulo: 'Mantenimiento' } },
      { path: 'asignacion', component: AsignacionComponent, data: { titulo: 'Nueva asignacione' } },


      { path: 'cursos', component: CursosComponent, data: { titulo: 'Cursos' } },
      { path: 'curso/:id', component: CursoComponent, data: { titulo: 'Curso' } },
      { path: 'curso/form/:id', component: FormComponent, data: { titulo: 'Curso' } },

      { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Estudiantes' } },
      { path: 'estudiante/:id', component: EstudianteComponent, data: { titulo: 'Estudiante' } },

      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
      { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },
      { path: 'user/form/:id', component: FormUserComponent, data: { titulo: 'Editar Usuario' } },

      { path: 'posts', component: PostsComponent, data: { titulo: 'Publicaciones' } },
      { path: 'post/:id', component: PostComponent, data: { titulo: 'Publicacion' } },
      { path: 'post/form/:id', component: FormPostsComponent, data: { titulo: 'Publicacion' } },

      { path: 'chat', component: ChatComponent, data: { titulo: 'Chat' } },

      { path: 'roles', component: RolesComponent, data: { titulo: 'Roles' } },
]

@NgModule({
  imports: [ RouterModule.forChild( childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
