import { IsNumber } from 'class-validator';

export class DeleteTokenDto {
  @IsNumber()
  id: number;
}
