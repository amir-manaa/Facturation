// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Check
} from 'typeorm';
import { CustomerTypeEnum } from '../models/enums/customer-type.enum';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
