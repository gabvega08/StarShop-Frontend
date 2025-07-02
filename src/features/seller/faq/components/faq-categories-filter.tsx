'use client';

import { useExpandableItems } from '@/features/buyer/faq/hooks/useExpandableItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SellerFAQTabs from './seller-faq-tabs';
import SellerFAQContentContainer from './seller-faq-content-container';
import SellerFAQExpandableItem from './seller-faq-expandable-item';
import {
  CreditCard,
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  Tag,
  Wallet,
} from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  faqs: FAQItem[];
  iconLarge: React.ReactNode;
}

export default function FAQCategoriesFilter() {
  const [activeCategory, setActiveCategory] = useState('general');
  const { toggleItem, isItemExpanded } = useExpandableItems();
  const { t } = useTranslation('common');

  const categories: CategoryData[] = [
    {
      id: 'general',
      name: t('General'),
      description: 'Frequently asked questions about general',
      icon: <HelpCircle size={14} />,
      iconLarge: <HelpCircle size={18} />,
      count: 4,
      faqs: [
        {
          question: t('What is StarShop Marketplace?'),
          answer: t('faq.general.whatIs.answer'),
        },
        {
          question: t('How do I create an account?'),
          answer: t('faq.general.createAccount.answer'),
        },
        {
          question: t('Is StarShop available worldwide?'),
          answer: t('faq.general.availability.answer'),
        },
        {
          question: t('What currencies are accepted on StarShop?'),
          answer: t('faq.general.currencies.answer'),
        },
      ],
    },
    {
      id: 'buying',
      name: t('Buying'),
      description: 'Frequently asked questions about buying on StarShop',
      icon: <ShoppingBag size={14} />,
      iconLarge: <ShoppingBag size={18} />,
      count: 4,
      faqs: [
        {
          question: t('What can I buy on StarShop?'),
          answer: t('faq.buying.howToBuy.answer'),
        },
        {
          question: t('How do I buy on StarShop?'),
          answer: t('faq.buying.fees.answer'),
        },
        {
          question: t('Can I buy from anywhere in the world?'),
          answer: t('faq.buying.cancelPurchase.answer'),
        },
        {
          question: t('What currencies can I buy with on StarShop?'),
          answer: t('faq.buying.receiveItems.answer'),
        },
      ],
    },
    {
      id: 'selling',
      name: t('Selling'),
      description: 'Frequently asked questions about general',
      icon: <Tag size={14} />,
      iconLarge: <Tag size={18} />,
      count: 4,
      faqs: [
        {
          question: t('faq.selling.howToSell.question'),
          answer: t('faq.selling.howToSell.answer'),
        },
        {
          question: t('faq.selling.fees.question'),
          answer: t('faq.selling.fees.answer'),
        },
        {
          question: t('faq.selling.listingDuration.question'),
          answer: t('faq.selling.listingDuration.answer'),
        },
        {
          question: t('faq.selling.editListing.question'),
          answer: t('faq.selling.editListing.answer'),
        },
      ],
    },
    {
      id: 'payments',
      name: t('Payments'),
      description: 'Frequently asked questions about general',
      icon: <Wallet size={14} />,
      iconLarge: <Wallet size={18} />,
      count: 4,
      faqs: [
        {
          question: t('faq.payments.methods.question'),
          answer: t('faq.payments.methods.answer'),
        },
        {
          question: t('faq.payments.processingTime.question'),
          answer: t('faq.payments.processingTime.answer'),
        },
        {
          question: t('faq.payments.withdrawalLimits.question'),
          answer: t('faq.payments.withdrawalLimits.answer'),
        },
        {
          question: t('faq.payments.taxes.question'),
          answer: t('faq.payments.taxes.answer'),
        },
      ],
    },
    {
      id: 'nfts',
      name: t('NFTs'),
      description: 'Frequently asked questions about general',
      iconLarge: <CreditCard size={18} />,
      icon: <CreditCard size={14} />,
      count: 4,
      faqs: [
        {
          question: t('faq.nfts.blockchains.question'),
          answer: t('faq.nfts.blockchains.answer'),
        },
        {
          question: t('faq.nfts.create.question'),
          answer: t('faq.nfts.create.answer'),
        },
        {
          question: t('faq.nfts.fileTypes.question'),
          answer: t('faq.nfts.fileTypes.answer'),
        },
        {
          question: t('faq.nfts.royalties.question'),
          answer: t('faq.nfts.royalties.answer'),
        },
      ],
    },
    {
      id: 'support',
      name: t('Support'),
      description: 'Frequently asked questions about general',
      icon: <MessageSquare size={14} />,
      iconLarge: <MessageSquare size={18} />,
      count: 4,
      faqs: [
        {
          question: t('faq.support.contact.question'),
          answer: t('faq.support.contact.answer'),
        },
        {
          question: t('faq.support.hours.question'),
          answer: t('faq.support.hours.answer'),
        },
        {
          question: t('faq.support.knowledgeBase.question'),
          answer: t('faq.support.knowledgeBase.answer'),
        },
        {
          question: t('faq.support.reportProblem.question'),
          answer: t('faq.support.reportProblem.answer'),
        },
      ],
    },
  ];

  const activeData =
    categories.find(cat => cat.id === activeCategory) || categories[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <SellerFAQTabs
        items={categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          count: cat.count,
        }))}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      <SellerFAQContentContainer
        iconLarge={activeData.iconLarge}
        title={activeData.name}
        description={t(activeData.description, {
          category: activeData.name.toLowerCase(),
        })}
      >
        {activeData.faqs.map(faq => (
          <SellerFAQExpandableItem
            key={faq.question}
            title={faq.question}
            content={faq.answer}
            isExpanded={isItemExpanded(faq.question)}
            onToggle={() => toggleItem(faq.question)}
          />
        ))}
      </SellerFAQContentContainer>
    </div>
  );
}
