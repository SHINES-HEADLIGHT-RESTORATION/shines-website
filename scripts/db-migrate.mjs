#!/usr/bin/env node
/**
 * Apply schema and optionally import local data/*.json into Neon.
 * Usage: DATABASE_URL=postgres://... npm run db:migrate
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const url = process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim();
if (!url) {
  console.error("Set DATABASE_URL or POSTGRES_URL (from Vercel Neon integration).");
  process.exit(1);
}

const schemaPath = join(root, "src", "lib", "db", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

async function importJsonIfEmpty() {
  const bookingsPath = join(root, "data", "bookings.json");
  const availabilityPath = join(root, "data", "availability.json");

  const { rows: countRows } = await client.query(
    "SELECT COUNT(*)::int AS count FROM appointments",
  );
  const count = countRows[0]?.count ?? 0;

  if (count === 0 && existsSync(bookingsPath)) {
    const bookings = JSON.parse(readFileSync(bookingsPath, "utf8"));
    if (Array.isArray(bookings) && bookings.length > 0) {
      for (const appointment of bookings) {
        const email = String(appointment.email ?? "").trim().toLowerCase();
        await client.query(
          `INSERT INTO appointments (id, reference, email, scheduled_at, status, data)
           VALUES ($1, $2, $3, $4, $5, $6::jsonb)
           ON CONFLICT (id) DO NOTHING`,
          [
            appointment.id,
            appointment.reference ?? null,
            email,
            appointment.scheduledAt ?? null,
            appointment.status ?? "pending",
            JSON.stringify(appointment),
          ],
        );
      }
      console.info(`Imported ${bookings.length} booking(s) from data/bookings.json`);
    }
  }

  if (existsSync(availabilityPath)) {
    const config = JSON.parse(readFileSync(availabilityPath, "utf8"));
    await client.query(
      `INSERT INTO availability_config (id, config)
       VALUES ('default', $1::jsonb)
       ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config`,
      [JSON.stringify(config)],
    );
    console.info("Synced availability from data/availability.json");
  }
}

try {
  await client.connect();
  await client.query(schema);
  console.info("Schema applied.");
  await importJsonIfEmpty();
  console.info("Done.");
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await client.end();
}
