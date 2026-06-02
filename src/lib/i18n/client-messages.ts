import type { SiteMessages } from "@/lib/i18n/messages/types";

/** Messages passed to client components (no server-only meta or article bodies). */
export type ClientSiteMessages = Omit<SiteMessages, "meta" | "articles">;

export function toClientMessages(messages: SiteMessages): ClientSiteMessages {
  const { meta: _meta, articles: _articles, ...client } = messages;
  return client;
}
