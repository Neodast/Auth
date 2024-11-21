import { Injectable } from '@nestjs/common';
import { Repository } from 'src/database/database.repository';
import { SchemaName } from 'src/database/decorators/schema-name.decorator';
import { ConditionDto } from 'src/database/dtos/condition.dto';
import { DatabaseParams } from 'src/database/dtos/db-params.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from 'src/database/constants/database.constant';
import { UserDto } from './dtos/user.dto';

@Injectable()
@SchemaName('users')
export class UserRepository extends Repository {
  public async findUsers(params?: DatabaseParams): Promise<UserDto[]> {
    return this.find<UserDto>(
      params ? params : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET },
    );
  }

  public async findUserBy(conditions: ConditionDto[]): Promise<UserDto> {
    return this.findOne<UserDto>({
      conditions: conditions,
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
