import { Body, Controller, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from '@api/app/features/auth/auth.service';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { AuthGuard } from '@api/common/guards/auth.guard';
import { SignInDto } from '@api/auth/dto/sign-in.dto';
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ access_token: string }> {
    const { access_token } = await this.authService.signIn(
      signInDto,
      res,
    );

    return { access_token };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    const { access_token } = await this.authService.refreshToken(refreshToken, res);

    return { access_token };
  }

  @Post('register')
  @UseGuards(AuthGuard)
  Register(@Body() userParams: CreateUserDto) {
    return this.authService.register(userParams);
  }
}
