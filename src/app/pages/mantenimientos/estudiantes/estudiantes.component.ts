import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../models/user.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  public cargando: boolean = true;
  public estudiantes: Usuario[] = [];
  public estudiantesTemporales: Usuario[] = [];

  constructor( private usuarioService: UsuarioService, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getEstudents().subscribe( (estudiantes: any)  => {
      this.estudiantes = estudiantes;
      this.estudiantesTemporales = estudiantes;
      this.cargando = false;
    })
  }

  buscar( termino: string ){
    if ( termino.length === 0 ){
      return this.estudiantes = this.estudiantesTemporales;
    }
    this.busquedasService.buscarUsers( 'estudiantes', termino ).subscribe( resultados => {
      this.estudiantes = resultados;
    })
  }

}
