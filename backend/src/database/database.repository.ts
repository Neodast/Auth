import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from './constants/database.constant';
import { DrizzleDB } from './types/drizzle-db.type';
import { Reflector } from '@nestjs/core';
import { SCHEMA_NAME } from './decorators/schema-name.decorator';
import { and, eq } from 'drizzle-orm';
import { DatabaseParams } from './dtos/db-params.dto';
import { ConditionDto } from './dtos/condition.dto';

@Injectable()
export class Repository {
  protected schemaName?: string;
  protected schema: any;

  constructor(
    @Inject(DATABASE) private db: DrizzleDB,
    private reflector: Reflector,
  ) {}

  onModuleInit() {
    this.schemaName = this.reflector.get<string>(SCHEMA_NAME, this.constructor);
    this.schema = this.db._.fullSchema[this.schemaName];
  }

  protected conditionsToDrizzleStyle(conditions: ConditionDto[]) {
    const dbConditions = conditions.map((condition) => {
      return eq(this.schema[condition.key], condition.value);
    });

    return and(...dbConditions);
  }

  protected sql() {
    return this.db;
  }

  protected async find<Dto>(params: DatabaseParams): Promise<Dto[]> {
    return this.db
      .select()
      .from(this.schema)
      .where(
        params?.conditions
          ? this.conditionsToDrizzleStyle(params.conditions)
          : undefined,
      )
      .orderBy()
      .limit(params.limit)
      .offset(params.offset) as Promise<Dto[]>;
  }

  protected async findOne<Dto>(params: DatabaseParams): Promise<Dto> {
    return this.db.query[this.schemaName].findFirst({
      where: this.conditionsToDrizzleStyle(params.conditions),
    }) as Promise<Dto>;
  }

  protected async create<Dto>(
    data: typeof this.schema.$inferInsert,
  ): Promise<Dto> {
    return this.db
      .insert(this.schema)
      .values(data)
      .returning()
      .then() as Promise<Dto>;
  }

  protected async update<Dto>(
    newData: unknown,
    id: string | number,
  ): Promise<Dto> {
    return this.db
      .update(this.schema)
      .set(newData)
      .where(eq(this.schema.id, id))
      .returning()
      .then() as Promise<Dto>;
  }

  protected async delete(id: number | string) {
    return this.db.delete(this.schema).where(eq(this.schema.id, id));
  }
}
