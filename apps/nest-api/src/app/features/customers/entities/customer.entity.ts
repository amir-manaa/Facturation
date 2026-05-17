// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { CustomerTypeEnum } from '../models/enums/customer-type.enum';
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';

@Entity('customers')
@Check(`
  (type = '${CustomerTypeEnum.PART}' AND "name" IS NOT NULL AND "companyName" IS NULL)
  OR
  (type = '${CustomerTypeEnum.PRO}' AND "companyName" IS NOT NULL AND "name" IS NULL)
`)
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CustomerTypeEnum })
  type: CustomerTypeEnum;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.customer, {
    cascade: true,
    nullable: true,
  })
  invoices: InvoiceEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
