import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as moment from 'moment';
import * as dayjs from 'dayjs'

import { CursosService } from '../../../../services/cursos.service';

import Swal from 'sweetalert2';
import { Curso } from '../../../../models/curso.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public formSubmitted: boolean = false;
  public curso: Curso;
  public fechaInicio: string = '';
  public fechaFin: string = '';

  public Formulario = this.fb.group({
    nombre: new FormControl( '', [Validators.required, Validators.minLength(3)] ),
    horario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_inicio: new FormControl(  this.fechaInicio, [Validators.required, ] ),
    fecha_fin: new FormControl( this.fechaFin, [Validators.required]),
    state: new FormControl( false, [Validators.required] )
  });

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

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private cursoService: CursosService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.cargarCurso(id);
    }
  }

  cargarCurso(id: string) {
    this.cursoService.ShowCurso(id).subscribe((resp: Curso) => {
      this.curso = resp;
      this.Formulario.patchValue( resp );
      this.curso.id = parseInt(id);
      this.fechaInicio = dayjs( this.curso.fecha_inicio).format( 'YYYY-MM-DD' )
      this.fechaFin = dayjs( this.curso.fecha_fin ).format( 'YYYY-MM-DD' )
    });
  }

  EnviarCurso() {
    this.formSubmitted = true;
    // console.log(this.Formulario.value);
    if (this.Formulario.invalid) return;

    let peticion: Observable<any>;

    if (this.curso) {
      peticion = this.cursoService.PutCurso( this.curso.id, this.Formulario.value );
    } else {
      peticion = this.cursoService.PostCurso( this.Formulario.value );
    }
    peticion.subscribe(resp => {
      this.Toast.fire({
        icon: 'success',
        title: `Curso guardado exitosamente!`
      });
      this.router.navigateByUrl(`/dashboard/curso/${ resp.id }`);
      // console.log( resp )
    }, (err) => {
      console.log(err);
      this.Toast.fire({
        icon: 'error',
        title: `Problemas en la peticion, intente nuevamente!`
      });
    })
  }

  campoValido(campo: string): boolean {
    if (this.Formulario.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  onRegresar() {
    this.location.back();
  }

}
