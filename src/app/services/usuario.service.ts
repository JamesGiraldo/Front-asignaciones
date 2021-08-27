import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';

import { AuthService } from './auth.service';

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

  getEstudents(){
    return this.http.get(`${base_url}/students`, this.authService.headers ).pipe(
       delay(100)
      )
  }
}
