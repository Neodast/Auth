import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import {
  PASSWORD_LENGTH,
  USERNAME_LENGTH,
} from '../constants/database.constant';
import { tokens } from './token.schema';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: USERNAME_LENGTH }).notNull(),
  email: varchar('email').notNull(),
  password: varchar('password', { length: PASSWORD_LENGTH }).notNull(),
  tokenId: integer('tokenId').references(() => tokens.id),
});
