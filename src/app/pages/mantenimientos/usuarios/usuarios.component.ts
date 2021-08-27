import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public cargando: boolean = true;
  public usuarios: Usuario[] = [];
  public usuariosTemporales: Usuario[] = [];

  constructor( private usuarioService: UsuarioService, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe( (usuarios: any)  => {
      this.usuarios = usuarios;
      this.usuariosTemporales = usuarios;
      this.cargando = false;
    })
  }

  buscar( termino: string ){
    if ( termino.length === 0 ){
      return this.cargarUsuarios();
    }
    this.busquedasService.buscarUsers( 'users', termino ).subscribe( resultados => {
      this.usuarios = resultados;
    })
  }

}
