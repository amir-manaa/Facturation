import {
  Module,
} from '@nestjs/common';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';
import { HashService } from '@api/common/services/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
