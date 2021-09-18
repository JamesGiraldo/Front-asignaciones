import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../../models/user.model';
import { UsuarioService } from '../../../../services/usuario.service';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  public cargando: boolean = true;
  public estudiante: Usuario = { id: 0, nombre: '', apellido: '', email: '', edad: 0 };

  constructor( private usuarioService: UsuarioService,  private ActivatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( ({ id })   => this.cargarStudent( id ))
  }

  cargarStudent( id: number ){
    this.cargando = true;
    this.usuarioService.ShowStudent( id ).subscribe( student => {
      this.estudiante = student;
      this.cargando = false;
    })
  }

}
