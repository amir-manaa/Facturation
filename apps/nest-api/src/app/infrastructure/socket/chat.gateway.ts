// apps/api/src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:4200' }, // URL de ton app Angular
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Appelé quand un client se connecte
  handleConnection(client: Socket) {
    console.log(`Client connecté : ${client.id}`);
  }

  // Appelé quand un client se déconnecte
  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  // Écoute l'événement "joinRoom"
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string
  ) {
    client.join(room);
    client.to(room).emit('userJoined', { userId: client.id });
  }

  // Écoute l'événement "sendMessage"
  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { room: string; text: string; username: string }
  ) {
    const message = {
      id: Date.now(),
      username: payload.username,
      text: payload.text,
      timestamp: new Date().toISOString(),
    };

    // Envoie à TOUS dans la room (y compris l'émetteur)
    this.server.to(payload.room).emit('newMessage', message);
  }
}
