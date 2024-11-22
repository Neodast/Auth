import { Module } from '@nestjs/common';
import { TokenModule } from './tokens/token.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { CookieHelper } from './helpers/cookie.helper';
import { AuthMapper } from './mappers/auth.mapper';
import { AuthController } from './auth.controller';

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
