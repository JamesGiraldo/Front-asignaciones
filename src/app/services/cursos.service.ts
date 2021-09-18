import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { RegisterCurso } from '../interfaces/curso.interface';
import { Curso } from '../models/curso.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCursos() {
    return this.http.get(`${base_url}/cursos`, this.authService.headers).pipe(
      delay(100)
    );
  }

  ShowCurso( id: string ){
    return this.http.get(`${base_url}/cursos/${ id }`, this.authService.headers ).pipe(
       map( (resp: { ok: boolean, curso: Curso }) => resp.curso)
      )
  }

  PostCurso( data: RegisterCurso ) {
    const url = `${base_url}/cursos`;
    return this.http.post( url, data, this.authService.headers );
  }

  PutCurso( id: number, data: RegisterCurso ) {
    const url = `${base_url}/cursos/${ id }`;
    return this.http.put( url, data, this.authService.headers );
  }

  DeleteCurso( id: number ) {
    const url = `${base_url}/cursos/${ id }`;
    return this.http.delete( url , this.authService.headers );
  }

}
