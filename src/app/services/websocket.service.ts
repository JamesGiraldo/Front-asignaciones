import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Socket } from 'ngx-socket-io';
import { environment } from './../../environments/environment.prod';
import { shareReplay } from 'rxjs/operators';

const base_url = environment.apiv1;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketsMap: Map<string, Socket> = new Map();
  private url: string = `${ base_url }`;

  constructor(private socket: Socket) {}

  public of(namespace: string): Socket {
    const socketInstance = new Socket({ url: `${ this.url }/${ namespace }` });
    this.socketsMap.set(namespace, socketInstance);
    return socketInstance;
  }

  public getSocket(namespace: string) {
    return this.socketsMap.get(namespace);
  }

  public fromToEvent(socket: Socket, event: string) {
    return socket.fromEvent(event);
  }

  public emitToEvent<T>(socket: Socket, event: string, payload: T) {
    return socket.emit(event, payload);
  }

  public disconnect(namespace: string, all?: boolean): void {
    const socketInstace = this.socketsMap.get(namespace);
    socketInstace.disconnect();
    this.socketsMap.delete(namespace);
  }

  get connection() {
    return this.socket.fromEvent('connect').pipe(shareReplay(1));
  }

  public io = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    jsonp: false,
    transports: ["websocket"]
  });
}
