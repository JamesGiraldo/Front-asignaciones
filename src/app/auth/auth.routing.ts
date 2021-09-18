import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutGuard } from '../guards/logout.guard';

const routes: Routes = [

    { path: 'login', component: LoginComponent,  canActivate: [ LogoutGuard ],  data: { titulo: 'Login' } },
    { path: 'register', component: RegisterComponent, canActivate: [ LogoutGuard ],  data: { titulo: 'Registrarse' } },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
