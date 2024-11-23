import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../types/refresh-token.type';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateTokenDto } from './dtos/update-token.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AccessToken } from '../types/access-token.type';
import { TokenRepository } from './token.repository';
import { TokenDto } from './dtos/token.dto';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private repository: TokenRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  public async generateTokens(
    payload: UserPayloadDto,
  ): Promise<AccessToken & RefreshToken> {
    const tokens = {
      accessToken: this.jwtService.sign(
        { sub: payload },
        {
          secret: this.configService.get<string>('jwt.access.secret'),
          expiresIn: this.configService.get<string>('jwt.access.expires'),
        },
      ),
      refreshToken: this.jwtService.sign(
        { sub: payload },
        {
          secret: this.configService.get<string>('jwt.refresh.secret'),
          expiresIn: this.configService.get<string>('jwt.refresh.expires'),
        },
      ),
    };
    this.logger.log({
      message: `Tokens created for user ${payload.username}`,
      level: 'info',
      context: 'TokensService.generateTokens',
    });
    return tokens;
  }

  public async findByRefresh(refreshToken: string): Promise<TokenDto> {
    return this.repository.findTokenBy([
      {
        key: 'refreshToken',
        value: refreshToken,
      },
    ]);
  }

  public async findById(id: number): Promise<TokenDto> {
    return this.repository.findTokenBy([
      {
        key: 'id',
        value: id,
      },
    ]);
  }

  public async findByUserId(userId: string): Promise<TokenDto> {
    return this.repository.findTokenBy([
      {
        key: 'userId',
        value: userId,
      },
    ]);
  }

  public async saveRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<TokenDto> {
    return this.repository.createToken({
      refreshToken,
      userId,
    });
  }

  public async updateRefreshToken(newData: UpdateTokenDto): Promise<TokenDto> {
    return this.repository.updateToken(
      newData,
      (await this.findByUserId(newData.userId)).id,
    );
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    const token = await this.findByRefresh(refreshToken);

    this.repository.deleteToken(token.id);
  }
}
