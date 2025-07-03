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
