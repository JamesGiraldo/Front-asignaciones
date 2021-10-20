import { Validators, FormBuilder } from '@angular/forms';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public text: string = '';
  /** formulario posteado */
  public formSubmitted = false;

  /** propiedad publica formulario de registro */
  public chatForm: any = this.fb.group({ text: ['', Validators.required] });

  constructor(private fb: FormBuilder, public chatService: ChatService) { }

  ngOnInit() { }

  sendMessage() {
    this.formSubmitted = true;

    if (this.chatForm.get('text').value.trim().length === 0) return;

    let messageInfo = {
      text: this.chatForm.get('text').value,
      messageType: 0
    };
    this.chatService.sendMessage(messageInfo);
    window.scrollTo(0, document.body.scrollHeight);
    this.chatForm.reset();
  }

}
