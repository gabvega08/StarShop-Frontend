"use client";

import { useState } from "react";
import QuickGuideCards from "./quick-guide";
import FAQAccordion from "./faq-accordion";
import { faqs } from "../constants/data";

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <QuickGuideCards />
      <FAQAccordion faqs={faqs} searchQuery={searchQuery} />
    </div>
  );
};

export default FAQPage;
