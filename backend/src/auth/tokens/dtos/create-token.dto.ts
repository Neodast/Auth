import { Expose } from 'class-transformer';
import { IsJWT, IsString, IsUUID } from 'class-validator';

export class CreateTokenDto {
  @Expose()
  @IsJWT()
  refreshToken: string;

  @IsString()
  @IsUUID(4)
  userId: string;
}
