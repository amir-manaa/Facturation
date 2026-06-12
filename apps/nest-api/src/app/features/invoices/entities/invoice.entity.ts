// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InvoiceStatusEnum } from '../models/enums/invoice-status.enum';
import { CustomerEntity } from '../../customers/entities/customer.entity';
import { InvoiceItemEntity } from '@api/app/features/invoices/entities/invoice-item.entity';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'invoice_number' })
  invoiceNumber: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => InvoiceItemEntity, (item) => item.invoice, {
    cascade: true,
    nullable: true,
  })
  invoiceItems: InvoiceItemEntity[];

  @Column({ name: 'issue_date' })
  issueDate: Date;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: InvoiceStatusEnum,
    default: InvoiceStatusEnum.OPEN,
  })
  status: InvoiceStatusEnum;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  subtotal: number;

  @Column('decimal', {
    precision: 5,
    scale: 4,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
    name: 'tax_rate'
  })
  taxRate: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
    name: 'tax_amount'
  })
  taxAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  total: number;

  @Column('decimal', {
    default: 0,
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
    name: 'paid_amount'
  })
  paidAmount: number;

  @Column('decimal', {
    default: 0,
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
    name: 'balance_due'
  })
  balanceDue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
