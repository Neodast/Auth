import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@src/user/user.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseModule } from '@src/database/database.module';
import { ConfigModule } from '@src/config/config.module';
import { UserService } from '../src/user/user.service';
import { UserRepository } from '../src/user/user.repository';
import { UserDto } from '@src/user/dtos/user.dto';

describe('User controller', () => {
  let app: INestApplication;
  let userController: UserController;

  beforeEach(async () => {
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
    return await request(await app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(async (res: request.Response) => {
        const users: UserDto[] = res.body;
        console.log('API Response:', users); // Add this line for debugging
        if (users.length > 0) {
          console.log(users[0]);
          expect(users[0].id).toBeDefined();
        }
        expect(users).toEqual(await userController.findAll());
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
