import { AuthModule } from './../src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from './../src/user/user.module';
import { DatabaseModule } from './../src/database/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        AuthModule,
        UserModule,
        ConfigModule,
        LoggerModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
