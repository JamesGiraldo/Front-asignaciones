import { Component, OnInit } from '@angular/core';

import { CursosService } from '../../../services/cursos.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalService } from '../../../components/modal/modal.service';

import { Curso } from '../../../models/curso.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cargando: boolean = true;
  public cursos: Curso[] = [];
  public cursosTemporales: Curso[] = [];

  public buscarForm = this.fb.group({
    termino: ['', [Validators.required, Validators.minLength(3)]]
  })

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


  constructor( private router: Router, private cursosService: CursosService, private fb: FormBuilder, private busquedasService: BusquedasService, private modalService: ModalService ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cargando = true;
    this.cursosService.getCursos().subscribe((cursos: any) => {
      this.cursos = cursos;
      this.cursosTemporales = cursos;
      this.cargando = false;
    })
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarCursos();
    }
    this.busquedasService.buscarUsers('cursos', termino).subscribe((resultados: any) => {
      this.cursos = resultados;
    })
  }

  guardarCambios(curso: Curso) {
    // this.cursosService.PutCurso( curso ).subscribe(() => {
      this.Toast.fire({
        icon: 'success',
        title: `Curso actualizado correctamente`
      });
    // });
  }

  EliminarCurso(curso: Curso, id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar este curso?',
      text: `Estas a punto de elminar el curso ${ curso.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF311E',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.cursosService.DeleteCurso( curso.id ).subscribe( () => {
          // this.cargarCursos();
          this.cursos.splice(id, 1);
          this.Toast.fire({
            icon: 'success',
            title: `Curso eliminado correctamente`
          });
        }, (err) => {
          this.Toast.fire({
            icon: 'error',
            title: ` ${err.error.message} `
          });
          console.log(err);
        });
      }
    })
  }

  abrirModal() {
      this.modalService.abrirModal();
  }

}
