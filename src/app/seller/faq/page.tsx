import FAQCategoriesFilter from '@/features/seller/faq/components/faq-categories-filter';
import FAQHeader from '@/features/seller/faq/components/faq-header';
import FAQInfoCards from '@/features/seller/faq/components/faq-info-cards';
import FAQFooter from '@/features/seller/faq/components/faq-footer';

export default function SellerFAQPage() {
  return (
    <div className="flex flex-col w-full min-h-screen p-4 md:p-6 lg:p-8 gap-12">
      <FAQHeader />
      <FAQInfoCards />
      <FAQCategoriesFilter />
      <FAQFooter />
    </div>
  );
}
