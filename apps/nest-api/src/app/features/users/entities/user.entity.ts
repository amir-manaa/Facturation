// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: Role.USER })
  role: string;
}

