import { Component, inject, signal } from '@angular/core';
import { ChatService } from './chat.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages: any[] = [];
  newMessage = signal<string>('');
  username = 'User_' + Math.floor(Math.random() * 1000);
  private sub!: Subscription;
  private chatService = inject(ChatService);

  ngOnInit(): void {
    this.chatService.joinRoom('general');

    this.sub = this.chatService.onNewMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  send(): void {
    console.log(this.newMessage());
    if (!this.newMessage().trim()) return;
    this.chatService.sendMessage('general', this.newMessage(), this.username);
    this.newMessage.set('');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.chatService.disconnect();
  }
}
