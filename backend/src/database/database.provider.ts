import { ConfigService } from '@nestjs/config';
import { DATABASE } from './constants/database.constant';
import { Pool } from 'pg';
import * as schema from './schemas/schema';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

export const databaseProvider = {
  provide: DATABASE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const pool = new Pool({
      connectionString: configService.get<string>('database.url'),
    });

    return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
  },
};
