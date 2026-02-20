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
import { UserRole } from '@common/models/enums/user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException();
    }

    return users;

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

  async findOne(id: string): Promise<Omit<UserEntity, 'password'>> {
    try {
      const user = await this.userRepository.findOneByOrFail({
        id,
      });
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('User not found');
    }
  }

  createOne(body: UserParams) {
    return body;
  }
}
