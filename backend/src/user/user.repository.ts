import { Injectable } from '@nestjs/common';
import { Repository } from 'src/database/database.repository';
import { EntityName } from 'src/database/decorators/schema-name.decorator';

@Injectable()
@EntityName('users')
export class UserRepository extends Repository {
  public findAll() {
    this.find();
  }
}
