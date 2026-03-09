import { UserEntity } from '@api/users/entities/user.entity';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

export function toDtoResponse(user: UserEntity): UserResponseDto {
  return plainToInstance(UserResponseDto, user, {
    excludeExtraneousValues: true,
  });
}
