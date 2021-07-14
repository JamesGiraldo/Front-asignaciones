import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';

/** componente */
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
