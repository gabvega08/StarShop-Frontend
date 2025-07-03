import FAQSearchInput from './faq-search-input';

export default function FAQHeader() {
  return (
    <div className="flex flex-col text-center gap-4">
      <p className="text-white font-extrabold text-lg lg:text-2xl">
        Frequently Asked Questions
      </p>
      <p className="text-white text-sm lg:text-base">
        Find answers to common questions about StarShop Marketplace
      </p>

      <div className="mx-auto w-2/4">
        <FAQSearchInput />
      </div>
    </div>
  );
}
