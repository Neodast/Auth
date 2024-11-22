import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      envFilePath: `.env`,
      load: [databaseConfig, jwtConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigModule {}
