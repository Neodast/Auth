import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthLocalPayloadDto } from './dtos/auth-local-payload.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegistrationUserDto } from './dtos/register-user.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Logger } from 'winston';
import { RefreshToken } from './types/refresh-token.type';
import { CookieHelper } from './helpers/cookie.helper';
import { AccessToken } from './types/access-token.type';
import { UserService } from 'src/user/user.service';
import { AuthMapper } from './mappers/auth.mapper';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private authMapper: AuthMapper,
    private cookieHelper: CookieHelper,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  public async verifyUser(
    userData: AuthLocalPayloadDto,
  ): Promise<UserPayloadDto> {
    const user = await this.userService.findByEmail(userData.email);

    const passwordIsValid = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordIsValid && userData.password !== user.password) {
      this.logger.log({
        message: 'Password is not valid',
        level: 'error',
        context: 'AuthService.verify',
      });
      throw new UnauthorizedException('Password is not valid');
    }
    return user;
  }

  public async login(
    loginData: LoginUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const user = await this.userService.findByEmail(loginData.email);

    const tokenEntity = await this.tokenService.findByUserId(user.id);
    const tokens = await this.tokenService.generateTokens(
      this.authMapper.mapUserToUserPayloadDto(user),
    );
    if (tokenEntity) {
      await this.tokenService.updateRefreshToken({
        userId: user.id,
        refreshToken: tokens.refreshToken,
      });
      return tokens;
    }
    await this.tokenService.saveRefreshToken(tokens.refreshToken, user.id);
    return tokens;
  }

  public async logout(userId: string): Promise<void> {
    const token = await this.tokenService.findByUserId(userId);
    if (!token) {
      this.logger.log({
        message: `Refresh token is not found`,
        level: 'error',
        context: 'AuthService.logout',
      });
      throw new NotFoundException('Refresh token is not found');
    }
    this.tokenService.deleteRefreshToken(token.refreshToken);
  }

  async registration(
    registrationData: RegistrationUserDto,
  ): Promise<AccessToken & RefreshToken> {
    const user = await this.userService.findByEmail(registrationData.email);
    if (user) {
      this.logger.log({
        message: `Email ${user.email} already exists`,
        level: 'error',
        context: 'AuthService.registration',
      });
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(registrationData.password);

    const userSecureData: RegistrationUserDto = {
      ...registrationData,
      password: hashedPassword,
    };
    const createdUser = await this.userService.createUser(userSecureData);
    const tokens = await this.tokenService.generateTokens(createdUser);
    this.tokenService.saveRefreshToken(tokens.refreshToken, createdUser.id);
    return tokens;
  }

  public async refresh(userId: string): Promise<AccessToken> {
    const dbToken = await this.tokenService.findByUserId(userId);
    if (!dbToken) {
      this.logger.log({
        message: `Refresh token ${dbToken} is not found`,
        level: 'error',
        context: 'AuthService.refresh',
      });
      throw new NotFoundException('Refresh token is not found');
    }
    const user = await this.userService.findById(userId);

    if (!user) {
      this.logger.log({
        message: `User with id ${userId} is not found`,
        level: 'error',
        context: 'AuthService.refresh',
      });
      throw new NotFoundException('User is not found');
    }

    const tokens = await this.tokenService.generateTokens(
      this.authMapper.mapUserToUserPayloadDto(user),
    );
    return { accessToken: tokens.accessToken };
  }
}
