import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  public formSubmitted: boolean = false;

  public Formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    horario: ['', Validators.required],
    fecha_inicio: ['', [Validators.required ]],
    fecha_fin: ['', [Validators.required]]
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

  constructor( private router: Router, private fb: FormBuilder, public modalService: ModalService, private cursoService: CursosService ) { }

  ngOnInit(): void {
  }

  campoValido(campo: string): boolean {
    if (this.Formulario.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
