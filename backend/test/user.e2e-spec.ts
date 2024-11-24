import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@src/user/user.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserDto } from '@src/user/dtos/user.dto';
import { AppModule } from '@src/app.module';

describe('User controller', () => {
  let app: INestApplication;
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userController = moduleRef.get<UserController>(UserController);
  });

  it(`/GET users`, async () => {
    return await request(await app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(async (res: request.Response) => {
        const users: UserDto[] = res.body;
        console.log(users[0]);
        expect(users[0].id).toBeDefined();
        expect(users).toEqual(await userController.findAll());
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
