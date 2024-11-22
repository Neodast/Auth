import { IsEmail, IsHash, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsString()
  username: string;

  @IsHash('SHA256', {
    message: 'Password incorrectly hashed',
  })
  password: string;
}
