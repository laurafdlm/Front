import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  public message$ = new BehaviorSubject<string>('');

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('/websocket')      ,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/actualizar', (message: Message) => {
        this.message$.next(message.body);
      });
    };

    this.stompClient.activate();
  }

  enviarMensaje(mensaje: string): void {
    this.stompClient.publish({ destination: '/app/notificar', body: mensaje });
  }
}
