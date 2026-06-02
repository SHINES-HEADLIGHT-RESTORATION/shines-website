/** @deprecated Use getMessages(locale).faq.items from @/lib/i18n/get-messages */
export type FaqItem = {
  question: string;
  answer: string;
};

import { en } from "@/lib/i18n/messages/en";

/** @deprecated Use getMessages(locale).faq */
export const faqDefaults = en.faq;
