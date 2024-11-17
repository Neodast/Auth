import { Module } from '@nestjs/common';
import { DATABASE } from './constants/database.constant';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas/schema';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DATABASE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get<string>('database.url'),
          ssl: true,
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
