import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeroScrollTransition } from "@/components/HeroScrollTransition";
import { RestorationSection } from "@/components/RestorationSection";
import { ValueSection } from "@/components/ValueSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FaqSection } from "@/components/FaqSection";
import { BookCtaSection } from "@/components/BookCtaSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-poster.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <Header />
      <HeroScrollTransition>
        <main className="bg-surface-section">
          <Hero />
          <RestorationSection />
          <ValueSection />
          <HowItWorksSection />
          <FaqSection />
          <BookCtaSection />
        </main>
      </HeroScrollTransition>
      <SiteFooter />
    </>
  );
}
