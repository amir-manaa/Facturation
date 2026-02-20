import {
  Module,
} from '@nestjs/common';
import { UsersController } from '@users//users.controller';
import { UsersService } from '@users//users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
