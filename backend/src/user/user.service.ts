import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  public async findAll(): Promise<UserDto[]> {
    return this.repository.findUsers();
  }

  public async findByUsername(username: string): Promise<UserDto> {
    return this.repository.findUserBy([
      {
        key: 'username',
        value: username,
      },
    ]);
  }

  public async createUser(user: CreateUserDto): Promise<UserDto> {
    return this.repository.createUser(user);
  }

  public async updateUser(
    newData: UpdateUserDto,
    id: string,
  ): Promise<UserDto> {
    return this.repository.updateUserInfo(newData, id);
  }

  public async deleteUser(id: string) {
    return this.repository.deleteUser(id);
  }
}
