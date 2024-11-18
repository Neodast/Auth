import { Injectable } from '@nestjs/common';
import { Repository } from 'src/database/database.repository';
import { SchemaName } from 'src/database/decorators/schema-name.decorator';

@Injectable()
@SchemaName('users')
export class UserRepository extends Repository {
  public findAll() {
    this.find();
  }
}
