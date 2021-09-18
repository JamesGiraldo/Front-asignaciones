import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  public formSubmitted: boolean = false;

  public Formulario = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    contenido: ['', Validators.required],
  });

  constructor( private router: Router,private route: ActivatedRoute, private location: Location, private fb: FormBuilder, public modalService: ModalService, private cursoService: CursosService ) { }

  ngOnInit(): void {
  }

  save(){
    this.formSubmitted = true;
    console.log(this.Formulario.value);
    if (this.Formulario.invalid) return;
    console.log("Entro en el modal")
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
