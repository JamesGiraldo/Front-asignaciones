import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Usuario } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: Usuario;
  public titulo: string = "";

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.usuario;
    this.getArgumentosRuta()
  }

  ngOnInit(): void {
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
    }).then((r) => {
      if (r.value) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    })
  }

  getArgumentosRuta() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      ).subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `Asignacion - ${ titulo }`;
      });
  }

  toggleNavbar() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar, .contenedor, .footer').toggleClass('active');
      $('.icono').toggleClass('bi bi-chevron-compact-right');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      // document.getElementById("bodyContent").style.width = "100%";
    });
  }

}
