import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() address: string;
  @Expose() phone: string;
  @Expose() role: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Exclude() refreshToken: string;
  @Exclude() passwordHash: string;
}
