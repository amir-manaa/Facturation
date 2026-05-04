import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice_items')
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoiceId' })
  invoice: InvoiceEntity;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  unitPrice: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
