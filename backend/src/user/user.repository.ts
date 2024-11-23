import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Repository } from '../database/database.repository';
import { DatabaseParams } from '../database/dtos/db-params.dto';
import { ConditionDto } from '../database/dtos/condition.dto';
import { SchemaName } from '../database/decorators/schema-name.decorator';

@Injectable()
@SchemaName('users')
export class UserRepository extends Repository {
  public async findUsers(params?: DatabaseParams): Promise<UserDto[]> {
    return this.find<UserDto>(params);
  }

  public async findUserBy(conditions: ConditionDto[]): Promise<UserDto> {
    return this.findOne<UserDto>({
      conditions,
    });
  }

  public async createUser(user: CreateUserDto): Promise<UserDto> {
    return this.create<UserDto>(user);
  }

  public async updateUserInfo(
    updateData: UpdateUserDto,
    id: string,
  ): Promise<UserDto> {
    return this.update<UserDto>(updateData, id);
  }

  public async deleteUser(id: string) {
    return this.delete(id);
  }
}
