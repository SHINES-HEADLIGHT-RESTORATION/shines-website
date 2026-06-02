import { mergeMessages } from "@/lib/i18n/messages/merge";
import { en } from "@/lib/i18n/messages/en";
import { frPatch } from "@/lib/i18n/messages/patches/fr";

export const fr = mergeMessages(en, frPatch);
