import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', Validators.required],
    // edad: [22, [Validators.required, Validators.min(10), Validators.max(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordIguales('password', 'password2')
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

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) return;

    // dispara un alert cargando
    Swal.fire({
      title: this.registerForm.get('nombre').value.toUpperCase() + ' ' + this.registerForm.get('apellido').value.toUpperCase(),
      text: 'Espere por favor...',
      icon: 'info',
      allowOutsideClick: false
    });

    // esto es el icono de sale dando vueltas como cargando
    Swal.showLoading();

    this.registerService.crearUsuario(this.registerForm.value).subscribe(resp => {
      // console.log(resp);

      // si todo esta ok cerramos en alert anterior
      Swal.close();

      this.router.navigateByUrl('/dashboard');
      this.Toast.fire({
        icon: 'success',
        title: `Bienvenido`
      });

    }, (err) => {
      console.log('Error', err.error.message, 'error');
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  campoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
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
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}
