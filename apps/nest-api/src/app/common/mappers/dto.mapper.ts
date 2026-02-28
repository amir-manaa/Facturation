import { UserEntity } from '@users/entities/user.entity';
import { UserResponseDto } from '@users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

export function toDtoResponse(user: UserEntity): UserResponseDto {
  return plainToInstance(UserResponseDto, user, {
    excludeExtraneousValues: true,
  });
}
