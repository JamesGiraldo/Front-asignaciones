import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/user.model';
import { CursosService } from '../../../services/cursos.service';
import { AsignacionesService } from '../../../services/asignaciones.service';
import { Curso } from 'src/app/models/curso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  public cargando: boolean = true;
  public estudiantes: Usuario[] = [];
  public cursos: Curso[] = [];
  public formSubmitted: boolean = false;

  public asignacionForm = this.fb.group({
    estudiante: new FormControl('', Validators.required ),
    curso: new FormControl('', Validators.required )
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

  constructor( private usuarioService: UsuarioService, private cursosService: CursosService, private fb: FormBuilder, private asignacionesService: AsignacionesService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarCursos();
  }

  asignacion(){
    this.formSubmitted = true;
    // console.log(this.Formulario.value);
    if (this.asignacionForm.invalid) return;
    let estudianteId = this.asignacionForm.get('estudiante').value;
    let cursoId = this.asignacionForm.get('curso').value;

    // console.log( this.asignacionForm.value )
    this.asignacionesService.PostAsignacion( estudianteId, cursoId ).subscribe( r => {
      console.log(  r  )
      this.Toast.fire({
        icon: 'success',
        title: `Asignacion de curso existosa!`
      });
    }, (e) => {
      console.log(e);
      this.Toast.fire({
        icon: 'error',
        title: `Problemas en la peticion, intente nuevamente!`
      });
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.getEstudents().subscribe( (estudiantes: any)  => {
      this.estudiantes = estudiantes;
      this.cargando = false;
    })
  }

  cargarCursos() {
    this.cargando = true;
    this.cursosService.getCursos().subscribe((cursos: any) => {
      this.cursos = cursos;
      this.cargando = false;
    })
  }

  campoValido(campo: string): boolean {
    if (this.asignacionForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


}
