import { Module } from '@nestjs/common';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';
import { HashService } from '@api/common/services/hash.service';
import { TestCacheController } from '@api/users/cache/test-cache.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [TestCacheController, UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
