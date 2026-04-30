import { PipeTransform } from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { ERROR_CODES } from '@org/error-catalog';

export class UuidValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!isUuid(value)) {
      throw new AppHttpException(ERROR_CODES.INVALID_UUID);
    }
    return value;
  }
}
