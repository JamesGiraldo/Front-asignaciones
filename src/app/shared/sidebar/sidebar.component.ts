import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: Usuario;

  constructor( private router: Router, public sidebarService: SidebarService, private authService: AuthService) {
    this.user = this.authService.usuario;
  }

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

  ngOnInit(): void {
  }

}
