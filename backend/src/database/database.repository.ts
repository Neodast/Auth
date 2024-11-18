import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from './constants/database.constant';
import { DrizzleDB } from './types/drizzle-db.type';
import { Reflector } from '@nestjs/core';
import { ENTITY_NAME } from './decorators/schema-name.decorator';

@Injectable()
export class Repository {
  protected schemaName?: string;

  constructor(
    @Inject(DATABASE) private db: DrizzleDB,
    private reflector: Reflector,
  ) {}

  onModuleInit() {
    this.schemaName = this.reflector.get<string>(ENTITY_NAME, this.constructor);
  }

  public find() {
    return this.db.query[this.schemaName]?.findMany();
  }
}
