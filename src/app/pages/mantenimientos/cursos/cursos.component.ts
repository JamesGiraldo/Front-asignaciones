import { Component, OnInit } from '@angular/core';

import { CursosService } from '../../../services/cursos.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cargando: boolean = true;
  public cursos: Curso[] = [];
  public cursosTemporales: Curso[] = [];
  constructor( private  cursosService: CursosService, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(){
    this.cargando = true;
    this.cursosService.getCursos().subscribe( ( cursos: any )  => {
      this.cursos = cursos;
      this.cursosTemporales = cursos;
      this.cargando = false;
    })
  }
  buscar( termino: string ){
    if ( termino.length === 0 ){
      return this.cargarCursos();
    }
    this.busquedasService.buscarUsers( 'cursos', termino ).subscribe( (resultados: any) => {
      this.cursos = resultados;
    })
  }
}
