import { CategoryData } from '../types/seller-faq';

import {
  CreditCard,
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  Tag,
  Wallet,
} from 'lucide-react';

export const getFAQCategories = (): CategoryData[] => [
  {
    id: 'general',
    name: 'General',
    description: 'Frequently asked questions about general',
    icon: HelpCircle,
    iconLarge: HelpCircle,
    count: 4,
    faqs: [
      {
        question: 'faq.general.whatIs.question',
        answer: 'faq.general.whatIs.answer',
      },
      {
        question: 'faq.general.createAccount.question',
        answer: 'faq.general.createAccount.answer',
      },
      {
        question: 'faq.general.availability.question',
        answer: 'faq.general.availability.answer',
      },
      {
        question: 'faq.general.currencies.question',
        answer: 'faq.general.currencies.answer',
      },
    ],
  },
  {
    id: 'buying',
    name: 'Buying',
    description: 'Frequently asked questions about buying on StarShop',
    icon: ShoppingBag,
    iconLarge: ShoppingBag,
    count: 4,
    faqs: [
      {
        question: 'faq.buying.howToBuy.question',
        answer: 'faq.buying.howToBuy.answer',
      },
      {
        question: 'faq.buying.fees.question',
        answer: 'faq.buying.fees.answer',
      },
      {
        question: 'faq.buying.cancelPurchase.question',
        answer: 'faq.buying.cancelPurchase.answer',
      },
      {
        question: 'faq.buying.receiveItems.question',
        answer: 'faq.buying.receiveItems.answer',
      },
    ],
  },
  {
    id: 'selling',
    name: 'Selling',
    description: 'Frequently asked questions about selling on StarShop',
    icon: Tag,
    iconLarge: Tag,
    count: 4,
    faqs: [
      {
        question: 'faq.selling.howToSell.question',
        answer: 'faq.selling.howToSell.answer',
      },
      {
        question: 'faq.selling.fees.question',
        answer: 'faq.selling.fees.answer',
      },
      {
        question: 'faq.selling.listingDuration.question',
        answer: 'faq.selling.listingDuration.answer',
      },
      {
        question: 'faq.selling.editListing.question',
        answer: 'faq.selling.editListing.answer',
      },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    description:
      'Frequently asked questions about payment methods and transactions',
    icon: Wallet,
    iconLarge: Wallet,
    count: 4,
    faqs: [
      {
        question: 'faq.payments.methods.question',
        answer: 'faq.payments.methods.answer',
      },
      {
        question: 'faq.payments.processingTime.question',
        answer: 'faq.payments.processingTime.answer',
      },
      {
        question: 'faq.payments.withdrawalLimits.question',
        answer: 'faq.payments.withdrawalLimits.answer',
      },
      {
        question: 'faq.payments.taxes.question',
        answer: 'faq.payments.taxes.answer',
      },
    ],
  },
  {
    id: 'nfts',
    name: 'NFTs',
    description: 'Frequently asked questions about NFTs and digital assets',
    iconLarge: CreditCard,
    icon: CreditCard,
    count: 4,
    faqs: [
      {
        question: 'faq.nfts.blockchains.question',
        answer: 'faq.nfts.blockchains.answer',
      },
      {
        question: 'faq.nfts.create.question',
        answer: 'faq.nfts.create.answer',
      },
      {
        question: 'faq.nfts.fileTypes.question',
        answer: 'faq.nfts.fileTypes.answer',
      },
      {
        question: 'faq.nfts.royalties.question',
        answer: 'faq.nfts.royalties.answer',
      },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Frequently asked questions about customer support',
    icon: MessageSquare,
    iconLarge: MessageSquare,
    count: 4,
    faqs: [
      {
        question: 'faq.support.contact.question',
        answer: 'faq.support.contact.answer',
      },
      {
        question: 'faq.support.hours.question',
        answer: 'faq.support.hours.answer',
      },
      {
        question: 'faq.support.knowledgeBase.question',
        answer: 'faq.support.knowledgeBase.answer',
      },
      {
        question: 'faq.support.reportProblem.question',
        answer: 'faq.support.reportProblem.answer',
      },
    ],
  },
];
