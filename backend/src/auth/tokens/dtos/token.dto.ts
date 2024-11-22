import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  id: number;

  @Expose()
  refreshToken: string;

  @Expose()
  userId: string;
}
