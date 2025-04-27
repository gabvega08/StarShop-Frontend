"use client"

import LandingPageComponent from "@/components/landing-page/LandingComponent";
import FAQCategories from "@/components/features/user/faq/FAQCategories";
import useWebSocket from "@/hooks/useWebSocket";
export default function LadingPage() {
  const { } = useWebSocket('')
  return (
    <>
      <LandingPageComponent />
      <FAQCategories />
    </>
  );
}
