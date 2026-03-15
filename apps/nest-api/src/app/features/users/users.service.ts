import {
  Injectable,
} from '@nestjs/common';
import { UserEntity } from '@api/users/entities/user.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { toDtoResponse } from '@api/common/mappers/dto.mapper';
import { ERROR_CODES } from '@org/error-catalog';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { HashService } from '@api/common/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private hashService: HashService
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
      where: { id },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return toDtoResponse(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserRefreshToken(id: string): Promise<{ refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['refreshToken'],
    });

    if (!user.refreshToken) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return user;
  }

  // async createOne(body: UserParams);
  async createOne(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const isEmailExists = await this.emailExists(createUserDto.email);

    if (isEmailExists) {
      throw new AppHttpException(ERROR_CODES.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashService.hash(createUserDto.password);
    createUserDto = {
      ...createUserDto,
      password: passwordHash,
    };

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return toDtoResponse(savedUser);
  }

  async updateRefreshToken(userId: string, hashedToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: hashedToken });
  }

  async emailExists(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email },
    });
  }
}
