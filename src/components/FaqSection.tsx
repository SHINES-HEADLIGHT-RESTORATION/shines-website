import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { faqs } from "@/lib/content";

export function FaqSection() {
  return (
    <SectionShell id="faq" evenPadding>
      <SectionHeading>Frequently asked questions</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-primary/80">
        Straight answers about headlight restoration in Belgium and across
        Europe: cost, timing, inspection, and how long results last.
      </p>

      <div className="mt-10 divide-y divide-text-primary/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {faq.question}
                <span
                  className="mt-1 shrink-0 text-action-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-body">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
