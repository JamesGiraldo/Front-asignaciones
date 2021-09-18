import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../../models/user.model';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public cargando: boolean = true;
  public usuario: Usuario = { id: 0, nombre: '', apellido: '', email: '', edad: 0, roles: [] };

  constructor( private usuarioService: UsuarioService, private ActivatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( ({ id })   => this.cargarUsuario( id ))
  }

  cargarUsuario( id: number ){
    this.cargando = true;
    this.usuarioService.ShowUsuario( id ).subscribe( user => {
      this.usuario = user;
      this.cargando = false;
    })
  }

}
