import FAQSearchInput from './faq-search-input';

export default function FAQHeader() {
  console.log('show me something');
  return (
    <div className="flex flex-col text-center gap-4">
      <p className="text-white font-extrabold text-2xl">
        Frequently Asked Questions
      </p>
      <p className="text-white text-sm">
        Find answers to common questions about StarShop Marketplace
      </p>

      <div className="mx-auto w-2/4">
        <FAQSearchInput />
      </div>
    </div>
  );
}
