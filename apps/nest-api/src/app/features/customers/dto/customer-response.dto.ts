import { Expose } from 'class-transformer';
import { CustomerTypeEnum } from '../models/enums/customer-type.enum';

export class CustomerResponseDto {
  @Expose() id: string;
  @Expose() type: CustomerTypeEnum;
  @Expose() name: string;
  @Expose() companyName: string;
  @Expose() address: string;
  @Expose() email: string;
  @Expose() phone: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
