import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: Usuario;
  // public usuario: Usuario;

  constructor( private router: Router, public sidebarService: SidebarService, private authService: AuthService, private usuarioService: UsuarioService) {
    this.user = this.authService.usuario;
    // console.log(this.user);
    // this.usuariologeado()
  }
  ngOnInit(): void {
    if ( this.user.roles.length !== 0 ){
      console.log( "si tienes roles" )
    }
  }

  // usuariologeado(){
  //   this.usuarioService.ShowUsuario( this.user.id ).subscribe( user  => {
  //     this.usuario = user
  //     console.log( this.usuario )
  //     console.log( "Recive la cantidad ", this.usuario.roles.length )
  //   })
  // }

  logout() {
    Swal.fire({
      title: 'Cerrar sesión!',
      text: `Seguro que quieres salir de la sesión?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF311E',
      confirmButtonText: 'Si'
    }).then( (r) => {
      if (r.value) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    })
  }


}
