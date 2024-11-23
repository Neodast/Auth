import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { CookieHelper } from './helpers/cookie.helper';
import { AuthMapper } from './mappers/auth.mapper';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule.register({}), TokenModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    CookieHelper,
    AuthMapper,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
