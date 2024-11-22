import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  refreshToken: varchar('refreshToken').notNull(),
  userId: text('userId'),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
