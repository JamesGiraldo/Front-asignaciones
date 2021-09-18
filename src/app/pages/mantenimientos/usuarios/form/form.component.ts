import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/user.model';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/role.model';
import { AsignacionesService } from 'src/app/services/asignaciones.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormUserComponent implements OnInit {

  public cargando: boolean = true;
  public formSubmitted: boolean = false;
  // public usuario: Usuario;
  public usuario: Usuario = { id: 0, nombre: '', apellido: '', email: '', edad: 0, roles: [] };
  public roles: Role[] = [];

  public FormularioUpdate = this.fb.group({
    nombre: new FormControl( '', [Validators.required, Validators.minLength(3)] ),
    apellido: new FormControl( '', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl( '', Validators.required ),
    email: new FormControl( '', [Validators.required, Validators.email ])
  });

  public formRole = this.fb.group({
    role: new FormControl( '', Validators.required )
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

  constructor( private router: Router, private route: ActivatedRoute,
               private location: Location, private asignacionesService: AsignacionesService,
               private fb: FormBuilder, private roleService: RolesService,
               private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarUsuario( parseInt( id ) );
    this.CargarRole();
  }

  cargarUsuario(id: number) {
    this.usuarioService.ShowUsuario( id ).subscribe( ( resp: Usuario ) => {
      this.usuario = resp;
      this.FormularioUpdate.patchValue( resp );
      this.usuario.id = ( id );
    });
  }

  CargarRole(){
    this.cargando = true;
    this.roleService.getRoles().subscribe( (r: Role[]) => {
      this.roles = r;
      this.cargando = false;
    })
  }


  EviarDatos() {
    this.formSubmitted = true;
    // console.log(this.Formulario.value);
    if (this.FormularioUpdate.invalid) return;

    let peticion: Observable<any>;

    if (this.usuario ) {
      peticion = this.usuarioService.actualizarPerfilUsers( this.usuario.id, this.FormularioUpdate.value );
    }
    peticion.subscribe(resp => {
      this.Toast.fire({
        icon: 'success',
        title: `Uusuario guardado exitosamente!`
      });
      this.router.navigateByUrl(`/dashboard/usuario/${ resp.id }`);
      // console.log( resp )
    }, (err) => {
      // console.log(err);
      this.Toast.fire({
        icon: 'error',
        title: `Problemas en la peticion, intente nuevamente!`
      });
    })
  }

  asignacion(){
    this.formSubmitted = true;
    if (this.formRole.invalid) return;
    let usuarioId = this.usuario.id;
    let rolId = this.formRole.get('role').value;

    this.asignacionesService.actualizarRoleUser(  usuarioId, parseInt( rolId) ).subscribe( r => {
      this.Toast.fire({
        icon: 'success',
        title: `Asignacion de rol existosa!`
      });
    }, (e) => {
      console.log( e )
      this.Toast.fire({
        icon: 'error',
        title: `Problemas en la peticion, intente nuevamente!`
      });
    })
  }

  campoValidoRole(campo: string): boolean {
    if (this.formRole.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  campoValido(campo: string): boolean {
    if (this.FormularioUpdate.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  onRegresar() {
    this.location.back();
  }

}
