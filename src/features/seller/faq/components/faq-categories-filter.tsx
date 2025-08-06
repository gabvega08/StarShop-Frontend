'use client';

import { useExpandableItems } from '@/features/buyer/faq/hooks/useExpandableItem';
import { useState } from 'react';
import FAQTabs from './faq-tabs';
import FAQContentContainer from './faq-content-container';
import FAQExpandableItem from './faq-expandable-item';
import { getFAQCategories } from '../data/faq-categories';

export default function FAQCategoriesFilter() {
  const [activeCategory, setActiveCategory] = useState('general');
  const { toggleItem, isItemExpanded } = useExpandableItems();

  const categories = getFAQCategories();

  const activeData =
    categories.find(cat => cat.id === activeCategory) || categories[0];

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <FAQTabs
          items={categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            count: cat.count,
          }))}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <FAQContentContainer
          iconLarge={activeData.iconLarge}
          title={activeData.name}
          description={activeData.description}
        >
          {activeData.faqs.map(faq => (
            <FAQExpandableItem
              key={faq.question}
              title={faq.question}
              content={faq.answer}
              isExpanded={isItemExpanded(faq.question)}
              onToggle={() => toggleItem(faq.question)}
            />
          ))}
        </FAQContentContainer>
      </div>
    </div>
  );
}
