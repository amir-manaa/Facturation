import { Module } from '@nestjs/common';
import { AuthService } from '@api/auth/auth.service';
import { AuthController } from '@api/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@api/users/entities/user.entity';
import { UsersService } from '@api/users/users.service';
import { HashService } from '@api/common/services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    // JwtModule.register({ global: true })
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , HashService],
  exports: [AuthService],
})
export class AuthModule {}
