import { Test } from '@nestjs/testing';
import { UserController } from '@src/user/user.controller';
import { UserRepository } from '@src/user/user.repository';
import { UserService } from '@src/user/user.service';
import { UserDto } from '../dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '@src/common/enums/roles.enum';
import { DatabaseModule } from '@src/database/database.module';
import { ConfigModule } from '@src/config/config.module';

describe('User service', () => {
  let userController: UserController;
  let userService: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [DatabaseModule, ConfigModule],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('Should return an array of users', async () => {
      const result: UserDto[] = [
        {
          id: uuidv4(),
          email: 'user1@gmail.com',
          username: 'user1',
          password: 'userPass1',
          role: Roles.GUEST,
        },
        {
          id: uuidv4(),
          email: 'user2@gmail.com',
          username: 'user2',
          password: 'userPass2',
          role: Roles.USER,
        },
      ];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe(result);
    });
  });
});
