import { Injectable } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants/database.constant';
import { Reflector } from '@nestjs/core';
import { SCHEMA_NAME } from './decorators/schema-name.decorator';
import { and, asc, desc, eq } from 'drizzle-orm';
import { DatabaseParams } from './dtos/db-params.dto';
import { ConditionDto } from './dtos/condition.dto';
import { DatabaseService } from './database.service';
import { DrizzleDB } from './types/drizzle-db.type';

@Injectable()
export class Repository {
  protected schemaName?: string;
  protected schema: any;
  protected db: DrizzleDB;

  constructor(
    private databaseService: DatabaseService,
    private reflector: Reflector,
  ) {}

  onModuleInit() {
    this.db = this.databaseService.db;
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
    const orderBy =
      params?.orderBy?.direction === 'desc'
        ? desc(this.schema[params.orderBy.column])
        : asc(this.schema[params?.orderBy?.column] || this.schema.id);

    return this.db
      .select()
      .from(this.schema)
      .where(
        params?.conditions
          ? this.conditionsToDrizzleStyle(params.conditions)
          : undefined,
      )
      .orderBy(orderBy)
      .limit(params?.limit || DEFAULT_LIMIT)
      .offset(params?.offset || DEFAULT_OFFSET) as Promise<Dto[]>;
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
