import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DrizzleDB } from './types/drizzle-db.type';
import * as schema from './schemas/schema';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly pool: Pool;
  public readonly db: DrizzleDB;

  constructor(configService: ConfigService) {
    this.pool = new Pool({
      connectionString: configService.get<string>('database.url'),
    });
    this.db = drizzle(this.pool, { schema }) as DrizzleDB;
  }

  async onApplicationShutdown() {
    await this.pool.end();
  }
}
