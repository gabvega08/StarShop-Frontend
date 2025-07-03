'use client';

import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Search,
  Wallet,
} from 'lucide-react';
import FAQInfoCard from './faq-info-card';

export default function FAQInfoCards() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly lg:gap-0 lg:max-w-[1400px] lg:mx-auto">
      <FAQInfoCard
        icon={<Search />}
        title="New to StarShop?"
        description="Learn the basics of out marketplace"
        longDescription="Get started with our platform and learn how to buy, sell, and earn
            NFTs with every purchase."
        linkText="Getting Started Guide"
        linkHref="/guides/getting-started"
      />

      <FAQInfoCard
        icon={<Wallet />}
        title="Stellar Blockchain"
        description="Understanding crypto payments"
        longDescription="Learn how Stellar blockchain powers our marketplace and ensures
            secure, fast transactions."
        linkText="Blockchain Guide"
        linkHref="/guides/blockchain-guide"
        linkIcon={<ExternalLink />}
      />

      <FAQInfoCard
        icon={<MessageSquare />}
        title="Need help?"
        description="Contact our support team"
        longDescription="Can't find what you' looking for? Our support team is
            ready to assist you with any questions."
        linkText="Contact Support"
        linkHref="/guides/contact-support"
        linkIcon={<ArrowRight />}
        isPrimary
      />
    </div>
  );
}
