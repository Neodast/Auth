import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { OrderByDto } from './order-by.dto';
import { ConditionDto } from './condition.dto';

export class DatabaseParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsPositive()
  offset?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConditionDto)
  conditions?: ConditionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderByDto)
  orderBy?: OrderByDto;
}
