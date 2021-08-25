import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../models/user.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  public cargando: boolean = true;
  public estudiantes: Usuario[] = [];
  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getEstudents().subscribe( (estudiantes: any)  => {
      this.estudiantes = estudiantes;
      this.cargando = false;
    })
  }

}
