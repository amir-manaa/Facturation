import { UserEntity } from '@users/entities/user.entity';
import { UserResponseDto } from '@users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

export function toUserResponse(user: UserEntity): UserResponseDto {
  return plainToInstance(UserResponseDto, user, {
    excludeExtraneousValues: true,
  });
}

export function toUsersResponse(users: UserEntity[]): UserResponseDto[] {
  return plainToInstance(UserResponseDto, users, {
    excludeExtraneousValues: true,
  });
}
