export * from './user.schema';
export * from './token.schema';

// import { Type } from 'class-transformer';
// import { IsArray, IsNumber, IsOptional, IsPositive } from 'class-validator';
// import { Condition } from '../types/condition.type';
// import { OrderBy } from '../types/order-by.type';

// export class PaginationDto {
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber({ allowNaN: false })
//   @IsPositive()
//   limit?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber({ allowNaN: false })
//   @IsPositive()
//   offset?: number;

//   @IsOptional()
//   @IsArray()
//   conditions?: Condition[];

//   @IsOptional()
//   orderBy?: OrderBy;
// }
