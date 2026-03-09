import { HttpException } from '@nestjs/common';
import { ErrorCodes, HTTP_ERROR_CATALOG } from '@org/error-catalog';

export class AppHttpException extends HttpException {
  constructor(code: ErrorCodes, details?: unknown) {
    const def = HTTP_ERROR_CATALOG[code];

    super(
      {
        code: def.code,
        message: def.message,
        details,
      },
      def.status
    );
  }
}
