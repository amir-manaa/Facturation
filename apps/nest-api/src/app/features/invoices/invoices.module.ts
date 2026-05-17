import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '@api/common/services/hash.service';
import { InvoicesService } from '@api/app/features/invoices/invoices.service';
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';
import { InvoiceItemEntity } from '@api/app/features/invoices/entities/invoice-item.entity';
import { InvoicesResolver } from '@api/app/features/invoices/invoices.resolver';
import { CustomersService } from '../customers/customers.service';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { QueueModule } from '@api/app/infrastructure/queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceEntity,
      InvoiceItemEntity,
      CustomerEntity,
    ]),
    QueueModule,
  ],
  controllers: [],
  providers: [InvoicesResolver, InvoicesService, HashService, CustomersService],
})
export class InvoicesModule {}
