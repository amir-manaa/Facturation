import { PipeTransform, BadRequestException, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      // Retourne un BadRequestException si la validation échoue
      throw new BadRequestException(HttpStatus.BAD_REQUEST);
    }

    return result.data; // Retourne les données validées

    // try {
    //   return this.schema.safeParse(value);
    // } catch (error) {
    //   throw new BadRequestException(error.message);
    // }
  }
}
