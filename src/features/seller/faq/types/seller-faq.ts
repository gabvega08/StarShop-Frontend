import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<LucideProps>;
  count: number;
  faqs: FAQItem[];
  iconLarge: ComponentType<LucideProps>;
}
