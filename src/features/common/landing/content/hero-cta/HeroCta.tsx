import { CTA_CONTENT } from './constants/cta';
import { CtaHeader } from './components/CtaHeader';
import { BenefitsList } from './components/BenefitsList';
import { CtaButtons } from './components/CtaButtons';
import { InteractiveCards } from './components/InteractiveCards';
import { TrustSection } from './components/TrustSection';

export function Cta() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <CtaHeader
              badge={CTA_CONTENT.badge}
              title={CTA_CONTENT.title}
              description={CTA_CONTENT.description}
            />
            <BenefitsList benefits={CTA_CONTENT.benefits} />
            <CtaButtons buttons={CTA_CONTENT.buttons} />
          </div>

          {/* Right Content - Interactive Visual */}
          <InteractiveCards cards={CTA_CONTENT.interactiveCards} />
        </div>

        {/* Bottom Section - Trust Indicators */}
        <TrustSection
          title={CTA_CONTENT.trustSection.title}
          companies={CTA_CONTENT.trustSection.companies}
          indicators={CTA_CONTENT.trustSection.indicators}
        />
      </div>
    </section>
  );
}