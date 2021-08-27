import { Component, OnInit } from '@angular/core';

import { RolesService } from '../../../services/roles.service';
import { Role } from '../../../models/role.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public cargando: boolean = true;
  public roles: Role[] = [];

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

  constructor( private router: Router, private rolesService: RolesService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.rolesService.getRoles().subscribe( (roles: any)  => {
      this.roles = roles;
      this.cargando = false;
    }, (err) => {
      this.Toast.fire({
        icon: 'error',
        title: err.error.message
      });
      this.router.navigateByUrl('/dashboard');
    })
  }

}
