import { Component, OnInit } from '@angular/core';

import { CursosService } from '../../../../services/cursos.service';
import { BusquedasService } from '../../../../services/busquedas.service';
import { ModalService } from '../../../../components/modal/modal.service';

import { Curso } from '../../../../models/curso.model';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  public cargando: boolean = true;
  public curso: Curso = { id: 0, nombre: '', horario: '', fecha_inicio: '', fecha_fin: '', state: true };


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

  constructor(private router: Router, private cursosService: CursosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarCurso(id));
  }

  cargarCurso(id: string) {
    this.cargando = true;
    this.cursosService.ShowCurso(id).subscribe(resp => {
      this.curso = resp;
      this.cargando = false;
    });
  }

  DestroyCurso(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar este curso?',
      text: `Estas a punto de elminar el curso ${this.curso.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF311E',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.cursosService.DeleteCurso(id).subscribe(() => {
          this.Toast.fire({
            icon: 'success',
            title: `Curso eliminado correctamente`
          });
          this.router.navigateByUrl(`/dashboard/cursos`);
        }, (err) => {
          this.Toast.fire({
            icon: 'error',
            title: ` ${err} `
          });
          console.log(err);
        });
      }
    })
  }

}
