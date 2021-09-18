import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  constructor( private router: Router ) { }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'bi bi-house',
  //     submenu: [
  //       { titulo: 'Home', icono: 'bi bi-house',  url: '/' },
  //       { titulo: 'Dashboard', icono: 'bi bi-speedometer',  url: '/' },
  //       { titulo: 'Settings', icono: 'bi bi-gear-fill',  url: '/' },
  //       { titulo: 'Services', icono: 'bi bi-info-circle',  url: '/' },
  //       { titulo: 'About', icono: 'bi bi-file-person',  url: '/' },
  //     ]
  //   }
  // ];

}
