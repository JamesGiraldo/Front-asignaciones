import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { PerfilUpdate } from '../interfaces/perfil-update.interface';

const base_url = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  PostAsignacion( user_id: number, curso_id: number ){
    const url = `${base_url}/cursos/asignaciones`;
    return this.http.post( url, { user_id, curso_id }, this.authService.headers );
  }

  actualizarRoleUser( user_id: number, role_id: number ){
    const url = `${base_url}/roles/asignaciones`;
    return this.http.post(url, { user_id, role_id }, this.authService.headers )
  }

}
