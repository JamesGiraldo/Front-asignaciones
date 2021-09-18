import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { Usuario } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilFrom: FormGroup;
  public usuario: Usuario;
  public formSubmitted: boolean = false;

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

  constructor( private router: Router, private fb: FormBuilder, private authService: AuthService, private usuarioService: UsuarioService ) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {

    this.perfilFrom = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      apellido: [this.usuario.apellido, [Validators.required,  Validators.min(10), Validators.max(100)]],
      edad: [this.usuario.edad, [Validators.required, Validators.min(10)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilFrom.value ).subscribe( () => {
      const { nombre, apellido, edad, email } = this.perfilFrom.value;
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      this.usuario.edad = edad;
      this.usuario.email = email;
      this.Toast.fire({
        icon: 'success',
        title: `Perfil actualizado correctamente`
      });
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return err;
    })
  }

  campoValido(campo: string): boolean {
    if (this.perfilFrom.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}
