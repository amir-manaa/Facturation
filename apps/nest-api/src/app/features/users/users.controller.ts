import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '@users//users.service';
import {
  userParamsSchema,
  UserParams,
} from '@users/schemas/user-response.schema';
import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
import { ConfigService } from '@nestjs/config';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private configService: ConfigService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()gi;
    //throw new NotFoundException('Aucun utilisateur trouvé');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
    //throw new NotFoundException('Aucun utilisateur trouvé');
  }

  @Post()
  @UsePipes(new ZodValidationPipe(userParamsSchema))
  create(@Body() userParams: UserParams) {
    console.log('controller : ', userParams);
    console.log('controller : ', typeof  userParams.phone);
    console.log('controller : ', this.configService.get('DB_HOST'));
    this.usersService.createOne(userParams);
  }
}
