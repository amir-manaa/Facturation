import { Module } from '@nestjs/common';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';
import { HashService } from '@api/common/services/hash.service';
import { TestCacheController } from '@api/app/infrastructure/cache/test-cache.controller';
import { QueueModule } from '@api/app/infrastructure/queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), QueueModule],
  controllers: [TestCacheController, UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
