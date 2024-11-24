import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@src/user/user.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseModule } from '@src/database/database.module';
import { ConfigModule } from '@src/config/config.module';
import { UserService } from '../src/user/user.service';
import { UserRepository } from '../src/user/user.repository';

describe('User controller', () => {
  let app: INestApplication;
  let userController: UserController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userController = moduleRef.get<UserController>(UserController);
  });

  it(`/GET users`, async () => {
    const response = await request(await app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(response.body).toEqual(await userController.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
