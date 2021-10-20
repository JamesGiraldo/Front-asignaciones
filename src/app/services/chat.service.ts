import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chat: any[] = [];

  constructor( private socket: WebsocketService ) {
    this.onReceviMessage();
  }

  sendMessage( messageInfo  ){

    this.chat.push( messageInfo );
    this.socket.io.emit('sendMessage', messageInfo);
  }

  onReceviMessage() {
    this.socket.io.on('reciveMessage', (messageInfo) => {
      messageInfo.messageType = 1
      this.chat.push( messageInfo );
    })
  }


}
