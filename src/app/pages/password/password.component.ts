import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { PasswordService } from '../../services/password.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

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

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private passwordService: PasswordService) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
    this.perfilFrom = this.fb.group({
      lastPassword: ['', [Validators.required, Validators.min(6)]],
      password: ['', [Validators.required, Validators.min(6)]],
    }, {
      validators: this.passwordIguales('lastPassword', 'password')
    })
  }

  cambiarPassword() {
    this.formSubmitted = true;
    if (this.perfilFrom.invalid) {
      return;
    }
    this.passwordService.PutPassword(this.perfilFrom.value).subscribe( () => {
      const { password } = this.perfilFrom.value;
      this.usuario.password = password;

      Swal.fire({
        title: 'Cambio exitoso!',
        text: `Sr. ( ${ this.usuario.nombre } ) como contraseña ha sido modificada, debes iniciar sesión nuevamente para reflejar el cambio una monda así`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Deacuerdo!'
      }).then((result) => {
        if (result.value) {
            // this.Toast.fire({
            //   icon: 'success',
            //   title: `Contraseña actualizada`
            // });
            this.authService.logout();
            this.router.navigateByUrl('/login');
        }
      })


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

  contrasenasNoValidas() {
    const pass1 = this.perfilFrom.get('lastPassword').value;
    const pass2 = this.perfilFrom.get('password').value;
    if ((pass1 === pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors({ esIgual: true });
      } else {
        pass2Control.setErrors(null);
      }
    }
  }

  campoValido(campo: string): boolean {
    if (this.perfilFrom.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}
