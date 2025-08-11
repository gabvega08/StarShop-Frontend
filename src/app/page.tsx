'use client';
import Hero from '@/features/common/landing/components/hero';
import { WhyChooseSection } from '@/shared/components/sections/why-choose-us';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <WhyChooseSection />
    </main>
  );
}
