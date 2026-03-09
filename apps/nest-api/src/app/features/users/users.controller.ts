import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '@api/users/users.service';
import {
  userParamsSchema,
  UserParams,
} from '@api/users/schemas/user-response.schema';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@api/common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '@api/common/exceptions/http-exception.filter';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { UuidValidationPipe } from '@api/common/pipes/uuid-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {}

  @Get()
  // we can use filter here with UserFilters, it's like @Catch
  // @UseFilters(new HttpExceptionFilter())
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new UuidValidationPipe()) id: string) {
    return this.usersService.findOne(id);
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
