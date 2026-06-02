import { mergeMessages } from "@/lib/i18n/messages/merge";
import { en } from "@/lib/i18n/messages/en";
import { nlPatch } from "@/lib/i18n/messages/patches/nl";

export const nl = mergeMessages(en, nlPatch);
