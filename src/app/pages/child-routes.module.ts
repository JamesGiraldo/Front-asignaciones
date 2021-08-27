import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// components
import { DashboardComponent } from './dashboard/dashboard.component';

// mantenimientos
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PostsComponent } from './mantenimientos/posts/posts.component';

import { RolesComponent } from './mantenimientos/roles/roles.component';

const childRoutes: Routes = [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },

      // Mantenimientos
      { path: 'mantenimiento', component: MantenimientosComponent, data: { titulo: 'Mantenimiento' } },
      { path: 'cursos', component: CursosComponent, data: { titulo: 'Cursos' } },
      { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Estudiantes' } },
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
      { path: 'posts', component: PostsComponent, data: { titulo: 'Publicaciones' } },
      { path: 'roles', component: RolesComponent, data: { titulo: 'Roles' } },
]

@NgModule({
  imports: [ RouterModule.forChild( childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
