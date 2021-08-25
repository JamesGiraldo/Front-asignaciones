import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public cargando: boolean = true;
  public usuarios: Usuario[] = [];
  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe( (usuarios: any)  => {
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

}
