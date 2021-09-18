import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../services/posts.service';
import { UsuarioService } from '../../services/usuario.service';
import {CursosService } from '../../services/cursos.service';
import { Post } from '../../models/post.model';
import { Usuario } from '../../models/user.model';
import { Curso } from '../../models/curso.model';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  public roles: Role[] = [];

  public cargando: boolean = true;

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor(private router: Router, private usuarioService: UsuarioService, private  cursosService: CursosService, private postsService: PostsService, private rolesService: RolesService ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.cargando = true;
    // listar estudiantes
    this.usuarioService.getEstudents().subscribe( (estudiantes: Usuario[])  => {
      this.estudiantes = estudiantes;
      this.cargando = false;
    })
    // listar usuarios
    this.usuarioService.getUsuarios().subscribe( (users: Usuario[])  => {
      this.usuarios = users;
      this.cargando = false;
    })
    // listar cursos
    this.cursosService.getCursos().subscribe( (cursos: Curso[])  => {
      this.cursos = cursos;
      this.cargando = false;
    })
    // listar posts
    this.postsService.getPosts().subscribe( (posts: Post[])  => {
      this.posts = posts;
      this.cargando = false;
    })
     // listar posts
     this.rolesService.getRoles().subscribe( ( roles: Role[])  => {
      this.roles = roles;
      this.cargando = false;
    })
  }

}
