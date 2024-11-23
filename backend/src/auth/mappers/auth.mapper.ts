import { Injectable } from '@nestjs/common';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { UserDto } from '@src//user/dtos/user.dto';

@Injectable()
export class AuthMapper {
  public mapUserToUserPayloadDto(user: UserDto): UserPayloadDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }
}
