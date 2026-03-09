import {
  Module,
} from '@nestjs/common';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
