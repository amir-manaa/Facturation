// apps/web/src/app/chat/chat.service.ts
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: ReturnType<typeof io>;

  constructor() {
    this.socket = io('http://localhost:3000/chat'); // namespace /chat
  }

  // Rejoindre une room
  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  // Envoyer un message
  sendMessage(room: string, text: string, username: string): void {
    this.socket.emit('sendMessage', { room, text, username });
  }

  // Écouter les nouveaux messages (retourne un Observable)
  onNewMessage(): Observable<{
    id: number;
    username: string;
    text: string;
    timestamp: string;
  }> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => observer.next(message));
      // Cleanup quand le composant se désabonne
      return () => this.socket.off('newMessage');
    });
  }

  // Écouter quand quelqu'un rejoint
  onUserJoined(): Observable<{ userId: string }> {
    return new Observable((observer) => {
      this.socket.on('userJoined', (data) => observer.next(data));
      return () => this.socket.off('userJoined');
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
