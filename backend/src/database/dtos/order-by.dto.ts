import { IsString } from 'class-validator';

export class OrderByDto {
  @IsString()
  column: string;

  @IsString()
  direction: 'asc' | 'desc';
}
