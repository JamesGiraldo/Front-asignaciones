import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
    return this.authService.validarToken().pipe(
      map( user => {
        if ( user ){
          this.router.navigateByUrl( '/dashboard' )
          return false;
        }
        return true;
      })
    )
  }

}
