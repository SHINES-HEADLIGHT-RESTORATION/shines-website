/** Vercel Neon sets POSTGRES_URL; some tooling uses DATABASE_URL. */
export function getDatabaseUrl(): string | null {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    null
  );
}

export function usePostgresStore(): boolean {
  return getDatabaseUrl() !== null;
}
