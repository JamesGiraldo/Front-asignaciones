import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs/operators';

import { PerfilUpdate } from '../interfaces/perfil-update.interface';
import { AuthService } from './auth.service';
import { Usuario } from '../models/user.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsuarios(){
    return this.http.get(`${base_url}/users`, this.authService.headers ).pipe(
       delay(100)
      )
  }

  ShowUsuario( id: number ){
    return this.http.get(`${base_url}/users/${ id }`, this.authService.headers ).pipe(
       map( (resp: { ok: boolean, user: Usuario }) => resp.user)
      )
  }

  getEstudents(){
    return this.http.get(`${base_url}/estudiantes`, this.authService.headers ).pipe(
       delay(100)
      )
  }

  ShowStudent( id: number ){
    return this.http.get(`${base_url}/estudiantes/${ id }`, this.authService.headers ).pipe(
       map( (resp: { ok: boolean, student: Usuario }) => resp.student)
      )
  }

  actualizarPerfil( data: PerfilUpdate ){
    return this.http.put(`${base_url}/users/${ this.authService.id }`, data, this.authService.headers )
  }

  actualizarPerfilUsers( id: number, data: PerfilUpdate ){
    return this.http.put(`${base_url}/users/${ id }`, data, this.authService.headers )
  }

}
