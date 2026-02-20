import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };

    //to test error
    //throw new HttpException('test Error', HttpStatus.NOT_FOUND);
    /*
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Something bad happened',
    });
    */
    //throw new BadRequestException() ...
  }
}
