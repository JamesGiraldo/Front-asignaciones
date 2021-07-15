import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare  var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar, .contenedor, .footer').toggleClass('active');       
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        document.getElementById("bodyContent").style.width = "100%";
      });
    });
  }

}
