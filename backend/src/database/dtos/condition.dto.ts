import { IsString } from 'class-validator';

export class ConditionDto {
  @IsString()
  key?: string;

  @IsString()
  value?: string;
}
