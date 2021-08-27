import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Usuario } from '../models/user.model';
import { Post } from '../models/post.model';
import { Curso } from '../models/curso.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  private transformUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.id, user.nombre, user.apellido, user.email, user.edad, '', user.roles)
    )
  }
  private transformEstudiantes(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.id, user.nombre, user.apellido, user.email, user.edad, '')
    );
  }

  private transformPosts(resultados: any[]) {
    return resultados;
  }

  private transformCursos(resultados: any[]): Curso[] {
    return resultados;
  }

  buscarUsers(
    tipo: 'users'|'estudiantes'|'cursos'|'posts',
    termino: string,
  ) {
    const url = ` ${base_url}/coleccion/${tipo}/${termino} `;
    return this.http.get<any[]>(url, this.authService.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'users':
              return this.transformUsuarios(resp.resultados);

            case 'estudiantes':
              return this.transformEstudiantes(resp.resultados);

            case 'cursos':
              return this.transformCursos(resp.resultados);

            case 'posts':
              return this.transformPosts(resp.resultados);

            default:
              return [];
          }
        })
      );
  }

}
