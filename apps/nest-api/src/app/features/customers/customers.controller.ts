import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Put
} from '@nestjs/common';
import { CustomersService } from '@api/app/features/customers/customers.service';
import { UuidValidationPipe } from '@api/common/pipes/uuid-validation.pipe';
import { AuthGuard } from '@api/common/guards/auth.guard';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from '@api/customers/dto/update-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  // we can use filter here with UserFilters, it's like @Catch
  // @UseFilters(new HttpExceptionFilter())
  findAll(): Promise<CustomerResponseDto[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new UuidValidationPipe()) id: string) {
    return await this.customersService.findOne(id);
  }

  @Post()
  // create(@Body() userParams: CreateUserDto) ... dto validation, not zod validation
  // or
  // @UsePipes(new ZodValidationPipe(userParamsSchema))
  // async create(@Body() userParams: CreateUserDto): Promise<CreateUserDto> {
  async create(
    @Body() cutomerParams: CreateCustomerDto
  ): Promise<CreateCustomerDto> {
    // console.log('controller : ', this.configService.get('DB_HOST'));
    return await this.customersService.createOne(cutomerParams);
  }

  @Put(':id')
  async update(@Param('id', new UuidValidationPipe()) id: string, @Body() cutomerParams: UpdateCustomerDto) {
    return await this.customersService.updateOne(id, cutomerParams);
  }


  @Delete(':id')
  async delete(@Param('id', new UuidValidationPipe()) id: string) {
    return await this.customersService.deleteOne(id);
  }
}
