import { IsString, IsUUID } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  @IsUUID(4)
  id: string;
}
