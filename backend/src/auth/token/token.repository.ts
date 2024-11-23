import { Injectable } from '@nestjs/common';
import { SchemaName } from '../../database/decorators/schema-name.decorator';
import { TokenDto } from './dtos/token.dto';
import { CreateTokenDto } from './dtos/create-token.dto';
import { UpdateTokenDto } from './dtos/update-token.dto';
import { Repository } from '@src/database/database.repository';
import { ConditionDto } from '@src/database/dtos/condition.dto';

@Injectable()
@SchemaName('tokens')
export class TokenRepository extends Repository {
  public async findTokenBy(conditions: ConditionDto[]): Promise<TokenDto> {
    return this.findOne<TokenDto>({
      conditions,
    });
  }

  public async createToken(token: CreateTokenDto): Promise<TokenDto> {
    return this.create<TokenDto>(token);
  }

  public async updateToken(
    newData: UpdateTokenDto,
    id: number,
  ): Promise<TokenDto> {
    return this.update<TokenDto>(newData, id);
  }

  public async deleteToken(id: number) {
    return this.delete(id);
  }
}
