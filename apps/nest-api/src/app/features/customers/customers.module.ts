import { Module } from '@nestjs/common';
import  { CustomersController} from '@api/app/features/customers/customers.controller';
import { CustomersService } from '@api/app/features/customers/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@api/app/features/customers/entities/customer.entity';
import { HashService } from '@api/common/services/hash.service';
import { QueueModule } from '@api/app/infrastructure/queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), QueueModule],
  controllers: [CustomersController],
  providers: [CustomersService, HashService],
  exports: [CustomersService],
})
export class CustomersModule {}
