import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from './../../environments/environment.prod';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public io = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    jsonp: false,
    transports: ["websocket"]
  });

  constructor(){}


}
