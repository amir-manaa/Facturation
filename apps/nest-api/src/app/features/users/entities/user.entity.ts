// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from '@api/common/models/enums/role.enum';
import { IsDefined } from 'class-validator';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @IsDefined()
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  address: string | null;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  refreshToken: string | null = null;

  @Column({ nullable: true })
  password: string;

  @Column({ default: Role.USER })
  role: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}

