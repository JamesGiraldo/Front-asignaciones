import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private _service: NotificationsService ) { }

  ngOnInit(): void {
  }

}
