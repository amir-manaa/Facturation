import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { ERROR_CODES } from '@org/error-catalog';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);

    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED)
    }
  }
}
