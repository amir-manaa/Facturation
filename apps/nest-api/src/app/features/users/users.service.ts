import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '@users/models/user';
import { UserEntity } from '@users/entities/user.entity';
import { UserParams } from '@users/schemas/user-response.schema';
import { Repository} from 'typeorm';
import { Role } from '@common/models/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserResponseDto } from '@users/dto/user-response.dto';
import { toUserResponse, toUsersResponse } from '@users/mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException();
    }

    return toUsersResponse(users);

    //to test error
    //throw new HttpException('test Error', HttpStatus.NOT_FOUND);
    /*
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Something bad happened',
    });
    */
    //throw new BadRequestException() ...
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return toUserResponse(user);
  }

  // async createOne(body: UserParams);
  async createOne(body: CreateUserDto): Promise<UserResponseDto> {
    const email = body.email;
    const isEmailExists = await this.emailExists(email);

    if (isEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(user);
    return toUserResponse(savedUser);

    // try {
    //   const user = this.userRepository.create(body);
    //   return await this.userRepository.save(user);
    // } catch (error) {
    //   if (error.code === '23505') {
    //     throw new BadRequestException({
    //       message: 'Email already exists',
    //       error: 'Bad Request',
    //     });
    //   }
    //   throw error;
    // }
  }

  private async emailExists(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email },
    });
  }
}
