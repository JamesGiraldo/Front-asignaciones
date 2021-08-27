import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted: boolean = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });
  /** propiedad para recordar email */
  public recordarme: boolean = false;
  public user: Usuario;

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

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.user =  this.authService.usuario;
  }

  ngOnInit(): void {
  }

  login_in() {
    this.authService.sing_in(this.loginForm.value).subscribe(resp => {

      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/dashboard');
      this.Toast.fire({
        icon: 'success',
        title: `Bienvenido`
      });

    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  login() {
  }

  irRegister() {
    this.router.navigateByUrl('/register');
  }

}
