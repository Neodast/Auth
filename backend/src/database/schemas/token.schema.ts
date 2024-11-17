import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  refreshToken: varchar('refreshToken').notNull(),
});
