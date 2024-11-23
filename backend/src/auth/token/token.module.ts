import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './token.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [TokenService, JwtService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
