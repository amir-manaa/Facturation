import {
  Body,
  Controller,
  Get,
  Req,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '@api/users/users.service';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { UuidValidationPipe } from '@api/common/pipes/uuid-validation.pipe';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // we can use filter here with UserFilters, it's like @Catch
  // @UseFilters(new HttpExceptionFilter())
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new UuidValidationPipe()) id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  // create(@Body() userParams: CreateUserDto) ... dto validation, not zod validation
  // or
  // @UsePipes(new ZodValidationPipe(userParamsSchema))
  // async create(@Body() userParams: CreateUserDto): Promise<CreateUserDto> {
  async create(@Body() userParams: CreateUserDto): Promise<CreateUserDto> {
    // console.log('controller : ', this.configService.get('DB_HOST'));
    return await this.usersService.createOne(userParams);
  }
}
