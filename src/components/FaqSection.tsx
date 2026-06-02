import Link from "next/link";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { getRequestMessages } from "@/lib/i18n/server";
import { mailtoQuote, site } from "@/lib/site";

export async function FaqSection() {
  const { messages } = await getRequestMessages();
  const { faq } = messages;

  return (
    <SectionShell id="faq" evenPadding>
      <SectionHeading>{faq.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-primary/80">
        {faq.intro}
      </p>

      <div className="mt-10 divide-y divide-text-primary/10">
        {faq.items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span
                  className="mt-1 shrink-0 text-action-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-body">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-text-body">
        {faq.contactPrompt}{" "}
        <a
          href={mailtoQuote()}
          className="font-medium text-action-primary underline underline-offset-4 hover:opacity-80"
        >
          {site.email}
        </a>{" "}
        {faq.contactOr}{" "}
        <Link
          href="/contact"
          className="font-medium text-action-primary underline underline-offset-4 hover:opacity-80"
        >
          {faq.contactLink}
        </Link>
        .
      </p>
    </SectionShell>
  );
}
