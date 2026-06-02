import type { Metadata } from "next";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";

type MetaKey = keyof Awaited<ReturnType<typeof getRequestMessages>>["messages"]["meta"];

export async function localizedPageMetadata(
  path: string,
  titleKey: MetaKey,
  descriptionKey: MetaKey,
  options?: { index?: boolean },
): Promise<Metadata> {
  const { locale, messages } = await getRequestMessages();
  return buildPageMetadata({
    path,
    locale,
    title: messages.meta[titleKey] as string,
    description: messages.meta[descriptionKey] as string,
    index: options?.index,
  });
}
