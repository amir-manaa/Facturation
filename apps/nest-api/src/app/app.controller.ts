import {
  Controller,
  Get,
  HttpCode,
  Query,
  Redirect,
  Param,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller()
// HttpExceptionFilter on main.ts to apply globally
//@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('simpleGet/*')
  @HttpCode(HttpStatus.ACCEPTED)
  getData() {
    //return this.appService.getData();
    throw new NotFoundException('Aucun utilisateur trouvé');
  }

  @Get('getQuery')
  @Redirect('https://docs.nestjs.com', HttpStatus.OK)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('getParam/:id/:page')
  findOne(
    @Param('id', new ParseIntPipe(), new ValidationPipe()) id: string,
    @Param('page') page: string
    //@Param() params: { id: string, page: string }
  ): string {
    return `This action returns an id #${id} and page #${page}`;
  }

  @Get('getParam2/:id')
  findTwo(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): string {
    console.log('id: ', typeof id);
    return `This action 2 returns a #${id} cat`;
  }

  @Get('getPromise')
  async promise(): Promise<any[]> {
    return [];
  }

  @Get('getObservable')
  observable(): Observable<any[]> {
    return of([1, 2, 3]);
  }

  @Get('getWithResponse')
  getWithResponse(@Res({ passthrough: true }) res: Response) {
    // @ts-ignore
    res.status(200);
    return [];
  }

  @Post('postWithBody')
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @Get('exception')
  async exception() {
    try {
      await this.appService.getData();
    } catch (error) {
      //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

      //customr exception

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }
}
