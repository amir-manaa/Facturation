import { UserEntity } from '@api/users/entities/user.entity';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { Type } from 'class-transformer';

/**
 * Transforme une entité (ou un objet) en DTO de manière générique.
 *
 * @template T - Le type du DTO retourné
 * @param data - L'entité ou l'objet à transformer
 * @param dtoClass - La classe DTO cible (constructor)
 * @returns Une instance du DTO avec les valeurs transformées
 *
 * @example
 * // Usage simple
 * const userDTO = toDto(user, UserResponseDto);
 *
 * // Usage avec array
 * const usersDTO = users.map(user => toDto(user, UserResponseDto));
 */
export function toDto<T extends object>(
  data: unknown,
  dtoClass: new () => T
): T {
  return plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
}

/**
 * Transforme un array d'entités en array de DTOs.
 *
 * @template T - Le type du DTO retourné
 * @param dataArray - L'array d'entités/objets à transformer
 * @param dtoClass - La classe DTO cible (constructor)
 * @returns Un array d'instances du DTO
 *
 * @example
 * const usersDTO = toDtoArray(users, UserResponseDto);
 */
export function toDtoArray<T extends object>(
  dataArray: unknown[],
  dtoClass: new () => T
): T[] {
  if (!Array.isArray(dataArray)) {
    return [];
  }
  return dataArray.map(item => toDto(item, dtoClass));
}

/**
 * @deprecated Utilisez `toDto(user, UserResponseDto)` à la place
 * Cette fonction est conservée pour la compatibilité rétroactive
 */
export function toDtoResponse(user: UserEntity): UserResponseDto {
  return toDto(user, UserResponseDto);
}

