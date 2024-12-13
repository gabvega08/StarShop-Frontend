"use client";

import { BagIcon } from "@/icons";
import CardContainer from "./components/CardContainer";
import { FlameIcon } from "lucide-react";
import { AboutStore } from "./components/AboutStore";
import { TopProducts } from "./components/TopProducts";
import { Statistics } from "./components/Statistics";
import { SellsPerMoth } from "./components/SellsPerMoth";

const DashboardComponent = () => {
  return (
    <div className="min-h-screen space-y-24 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {" "}
        {/* Contenedor centrado */}
        {/* About Your Store Section */}
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1fr_2fr] xl:gap-28">
          {/* Store Information */}
          <CardContainer
            title="About your store"
            icon={<BagIcon />}
            subtitle="STRAB"
          >
            <AboutStore />
          </CardContainer>

          {/* Top Products Section */}
          <CardContainer subtitle={"TOP PRODUCTS"}>
            <TopProducts />
          </CardContainer>
        </section>
        {/* Store Statistics Section */}
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1fr_2fr] xl:gap-28 mt-8">
          {/* Store Statistics */}
          <CardContainer
            className="flex flex-col"
            title="Your store statistics"
            icon={<FlameIcon color="#9354FF" width={41} height={33} />}
            subtitle={"Store statistics"}
          >
            <Statistics />
          </CardContainer>

          {/* Sells Per Month */}
          <CardContainer className="flex flex-col" subtitle={"SELLS PER MONTH"}>
            <SellsPerMoth />
          </CardContainer>
        </section>
      </div>
    </div>
  );
};

export default DashboardComponent;
