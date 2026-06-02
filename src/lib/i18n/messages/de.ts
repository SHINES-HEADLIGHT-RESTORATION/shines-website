import { mergeMessages } from "@/lib/i18n/messages/merge";
import { en } from "@/lib/i18n/messages/en";
import { dePatch } from "@/lib/i18n/messages/patches/de";

export const de = mergeMessages(en, dePatch);
