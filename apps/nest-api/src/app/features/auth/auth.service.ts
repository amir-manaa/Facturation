import { Injectable } from '@nestjs/common';
import { UsersService } from '@api/users/users.service';
import { HashService } from '@api/common/services/hash.service';
import { UserResponseDto } from '@api/users/dto/user-response.dto';
import { AppHttpException } from '@api/common/exceptions/app-http-exception';
import { ERROR_CODES } from '@org/error-catalog';
import { CreateUserDto } from '@api/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '@api/auth/dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { setRefreshTokenCookie } from '@api/auth/helpers/set-auth-cookies.helper';
import { Response } from 'express';
import { UserEntity } from '@api/users/entities/user.entity';
import { toDto } from '@api/common/mappers/dto.mapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signIn(
    signInDto: SignInDto,
    res: Response
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    const isValid = await this.hashService.verify(
      user.password,
      signInDto.password
    );
    if (!isValid) {
      throw new AppHttpException(ERROR_CODES.AUTH_INVALID_CREDENTIALS);
    }

    return this.generateTokens(res, user.id, user.role);
  }

  async refreshToken(
    refToken: string,
    res: Response
  ): Promise<{ access_token: string }> {
    if (!refToken) {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);
    }

    let payload = null;
    try {
      payload = this.jwtService.verify(refToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (err) {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);
    }

    const { refreshToken } = await this.usersService.findUserRefreshToken(
      payload.sub
    );

    const isValidRefreshToken = await this.hashService.verify(
      refreshToken,
      refToken
    );

    if (!isValidRefreshToken) {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);
    }

    return this.generateTokens(res, payload.sub, payload.role);
  }

  async generateTokens(
    res: Response,
    userId: string,
    userRole: string
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, role: userRole };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
      }),
    ]);

    const hashedRefreshToken = await this.hashService.hash(refresh_token);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);

    setRefreshTokenCookie(res, refresh_token);

    return { access_token };
  }

  async register(bocreateUserDtody: CreateUserDto): Promise<UserResponseDto> {
    // const email = body.email;
    // const isEmailExists = await this.usersService.emailExists(email);
    // if (isEmailExists) {
    //   throw new AppHttpException(ERROR_CODES.USER_ALREADY_EXISTS);
    // }
    //
    // const passwordHash = await this.hashService.hash(body.password);
    // const newUser = {
    //   ...body,
    //   password: passwordHash,
    // };

    return this.usersService.createOne(bocreateUserDtody);
  }

  async findOneByRefreshToken(refreshToken: string): Promise<UserEntity> {
    if (!refreshToken) {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);
    }

    const decode = (await this.jwtService.decode(refreshToken)) as {
      sub: string;
      email: string;
    };

    if (!decode || !decode.sub) {
      throw new AppHttpException(ERROR_CODES.AUTH_UNAUTHORIZED);
    }
    const user = await this.userRepository.findOne({
      where: { id: decode.sub },
    });

    if (!user) {
      throw new AppHttpException(ERROR_CODES.USER_NOT_FOUND);
    }

    return toDto(user, UserResponseDto);
  }
}
