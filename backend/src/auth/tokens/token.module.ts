import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { TokenRepository } from './token.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [TokenService, JwtService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
