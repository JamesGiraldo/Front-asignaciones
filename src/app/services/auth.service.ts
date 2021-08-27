import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap, catchError, delay } from 'rxjs/operators';

import { Usuario } from '../models/user.model';

import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  /** token del localStorage */
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  /** headers que se requieren en la peticiones */
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  /** inciciar sesión */
  sing_in(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp) => {
        this.guardarLocalStorage(resp['token']);
      })
    );
  }

  /** validar el token */
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/renew`, this.headers).pipe(
      map((resp: any) => {
        /** desestructurar la información de la respuesta */
        const { id, nombre, apellido, email, edad } = resp.usuario;
        /** Creando la instancia del objeto usuario  */
        this.usuario = new Usuario(id, nombre, apellido, email, edad, '');
        // console.log(this.usuario);
        /** guardando en el localStorage */
        this.guardarLocalStorage(resp['token']);
        return true;
      }),
      /** esto en caso de que suseda error  en todo el metodo, captura el error */
      catchError( err => of( false ) )
    )
  }

  /** Serrar sesión */
  logout() {
    this.removeLocalStorge();
  }

  /** metodo que gaurda datos en el localStorage */
  guardarLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  /** metodo que elimina los datos del localStorage */
  removeLocalStorge() {
    localStorage.removeItem('token');
  }
}
