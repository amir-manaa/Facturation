import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '@api/users/models/user';
import { UserEntity } from '@api/users/entities/user.entity';
import { UserParams } from '@api/users/schemas/user-response.schema';
import { Repository} from 'typeorm';
import { Role } from '@api/common/models/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { toDtoResponse } from '@api/common/mappers/dto.mapper';
import { ERROR_CODES } from '@org/error-catalog';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new AppHttpException(ERROR_CODES.USERS_NOT_FOUND);
    }

    return users.map(toDtoResponse);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return toDtoResponse(user);
  }

  // async createOne(body: UserParams);
  async createOne(body: CreateUserDto): Promise<UserResponseDto> {
    const email = body.email;
    const isEmailExists = await this.emailExists(email);

    if (isEmailExists) {
      throw new AppHttpException(ERROR_CODES.USER_ALREADY_EXISTS);
    }

    const user = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(user);
    return toDtoResponse(savedUser);
  }

  private async emailExists(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email },
    });
  }
}
