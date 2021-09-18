import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate  {

  constructor( private authService: AuthService, private router: Router ) { }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.authService.validarToken().pipe(
  //     tap(estaAutenticado => {
  //       if ( !estaAutenticado ) {
  //         this.router.navigateByUrl('/login');
  //       }
  //     })
  //   )
  // }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
    return this.authService.validarToken().pipe(
      map( user => {
        if ( !user ){
          this.router.navigateByUrl( '/login' )
          return false;
        }
        return true;
      })
    )
  }

}
