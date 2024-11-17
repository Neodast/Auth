import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas/schema';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function seedDatabase() {
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      const [user] = await db
        .insert(schema.users)
        .values([
          {
            username: 'user1',
            email: 'email1@gmail.com',
            password: await bcrypt.hash('pass1', 4),
          },
          {
            username: 'user2',
            email: 'email2@gmail.com',
            password: await bcrypt.hash('pass2', 4),
          },
          {
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 4),
          },
        ])
        .returning();
      return user.id;
    }),
  );
}

seedDatabase()
  .then(() => console.log('Database successfully seeded'))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
