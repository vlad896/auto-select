import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { FAQ_ITEMS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

// ============================================================
// FAQSection — dark theme with background car image
// ============================================================

export function FAQSection() {
  const accordionItems = FAQ_ITEMS.map((item) => ({
    title: item.question,
    content: item.answer,
  }));

  return (
    <section
      id="faq"
      className="relative section-padding bg-surface-950 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Subtle background car image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-front.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover opacity-8"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950/95 to-surface-950" />
      </div>

      <Container className="relative z-10 max-w-3xl">
        <SectionHeading
          label="Вопросы и ответы"
          subtitle="Ответы на частые вопросы о покупке авто в Беларуси и наших услугах."
        >
          <span id="faq-heading">FAQ: ответы на вопросы</span>
        </SectionHeading>

        <div className="rounded-2xl border border-white/10 bg-surface-100 px-5 shadow-sm sm:px-6">
          <Accordion items={accordionItems} defaultOpen={0} />
        </div>

        {/*
          SEO: full FAQ content for crawlers.
          Googlebot renders JS, but as a safety net we duplicate all
          answers inside a <noscript> block so they are always in the
          static HTML. The JSON-LD FAQPage schema on the homepage
          provides structured data; this ensures the raw text is also
          indexable even if JS execution is delayed or skipped.
        */}
        <noscript>
          <div className="sr-only">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} open>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </noscript>

        {/* CTA below FAQ */}
        <div className="mt-8 text-center sm:mt-10">
          <p className="mb-4 text-sm text-neutral-500">
            Не нашли ответ на свой вопрос?
          </p>
          <Button href="#quiz" variant="primary" size="md">
            Задать вопрос эксперту
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
