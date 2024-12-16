"use client";

import { BagIcon } from "@/icons";
import CardContainer from "./components/CardContainer";
import { FlameIcon } from "lucide-react";
import { AboutStore } from "./components/AboutStore";
import { TopProducts } from "./components/TopProducts";
import { Statistics } from "./components/Statistics";
import { SellsPerMonth } from "./components/SellsPerMonth";
import Bounded from "../ui/Bounded";
import Wrapper from "../ui/Wrapper";

const DashboardComponent = () => {
  return (
    <Bounded>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1fr_2fr] xl:gap-28">
        <CardContainer>
          <div className={`flex gap-2 items-center mb-2 pl-4`}>
            <BagIcon />
            <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-background">
              About your store
            </h3>
          </div>

          <Wrapper>
            <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
              STRAB
            </h4>
            <AboutStore />
          </Wrapper>
        </CardContainer>

        <CardContainer>
          <Wrapper>
            <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
              TOP PRODUCTS
            </h4>
            <TopProducts />
          </Wrapper>
        </CardContainer>
      </section>

      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1fr_2fr] xl:gap-28 mt-8">
        <CardContainer>
          <div className={`flex gap-2 items-center mb-2 pl-4`}>
            <FlameIcon color="#9354FF" width={41} height={33} />
            <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-background">
              Your store statistics
            </h3>
          </div>

          <Wrapper>
            <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2 uppercase">
              Store statistics
            </h4>
            <Statistics />
          </Wrapper>
        </CardContainer>

        <CardContainer>
          <Wrapper>
            <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
              SELLS PER MONTH
            </h4>
            <SellsPerMonth />
          </Wrapper>
        </CardContainer>
      </section>
    </Bounded>
  );
};

export default DashboardComponent;
