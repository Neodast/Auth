import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegistrationUserDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsStrongPassword({
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minLength: 6,
  })
  password: string;

  @IsString()
  username: string;
}
