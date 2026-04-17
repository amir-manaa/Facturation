import { Module } from '@nestjs/common';
import { ChatGateway } from '@api/app/infrastructure/socket/chat.gateway';

@Module({
  providers: [ChatGateway],
})
export class SocketModule {}
