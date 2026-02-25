import { PipeTransform, BadRequestException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

export class UuidValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!isUuid(value)) {
      throw new BadRequestException('UUID invalide');
    }
    return value;
  }
}
