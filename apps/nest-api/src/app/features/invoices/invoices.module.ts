import { Module } from '@nestjs/common';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';
import { HashService } from '@api/common/services/hash.service';
import { TestCacheController } from '@api/app/infrastructure/cache/test-cache.controller';
import { QueueModule } from '@api/app/infrastructure/queue/queue.module';
import { InvoicesController } from '@api/app/features/invoices/invoices.controller';
import { InvoicesService } from '@api/app/features/invoices/invoices.service';
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';
import { InvoiceItemEntity } from '@api/app/features/invoices/entities/invoice-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, InvoiceItemEntity])],
  controllers: [InvoicesController],
  providers: [InvoicesService, HashService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
