import { neon } from "@neondatabase/serverless";
import { getDatabaseUrl } from "@/lib/db/url";

export function getSql() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL is not configured. Add Neon via Vercel Marketplace.",
    );
  }
  return neon(url);
}
