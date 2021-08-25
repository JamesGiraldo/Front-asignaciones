import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../services/posts.service';
import { UsuarioService } from '../../services/usuario.service';
import {CursosService } from '../../services/cursos.service';
import { Post } from '../../models/post.model';
import { Usuario } from '../../models/user.model';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {

  public cursos: Curso[] = [];
  public usuarios: Usuario[] = [];
  public estudiantes: Usuario[] = [];
  public posts: Post[] = [];
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService, private  cursosService: CursosService, private postsService: PostsService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    // listar estudiantes
    this.usuarioService.getEstudents().subscribe( (estudiantes: any)  => {
      this.estudiantes = estudiantes;
      this.cargando = false;
    })
    // listar usuarios
    this.usuarioService.getEstudents().subscribe( (users: any)  => {
      this.usuarios = users;
      this.cargando = false;
    })
    // listar cursos
    this.cursosService.getCursos().subscribe( (cursos: any)  => {
      this.cursos = cursos;
      this.cargando = false;
    })
    // listar posts
    this.postsService.getPosts().subscribe( (posts: any)  => {
      this.posts = posts;
      this.cargando = false;
    })
  }

}
