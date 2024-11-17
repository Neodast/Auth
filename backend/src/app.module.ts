import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, DrizzleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
