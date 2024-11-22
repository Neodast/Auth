import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, UserModule, DatabaseModule, LoggerModule, AuthModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
