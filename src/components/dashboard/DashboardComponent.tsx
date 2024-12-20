"use client";
import { ShoppingBag, FlameIcon } from 'lucide-react';
import { AboutStore } from "./components/AboutStore";
import { TopProducts } from "./components/TopProducts";
import { Statistics } from "./components/Statistics";
import { SellsPerMonth } from "./components/SellsPerMonth";
import StarShopCard from "../ui/StarShopCard";

const DashboardComponent = () => {
  return (
    <div className="px-[6rem] flex flex-col">
      <div className="flex items-center mb-4 mt-12">
        <ShoppingBag  color="#9354FF" width={40} />
        <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-white">
          About your store
        </h3>
      </div>

      <section className="flex w-full justify-between">
        <StarShopCard className="w-[30%]">
          <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
            STRAB
          </h4>
          <AboutStore />
        </StarShopCard>

        <StarShopCard className="w-[60%]">
          <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
            TOP PRODUCTS
          </h4>
          <TopProducts />
        </StarShopCard>
      </section>

      <div className="flex items-center mt-24">
          <FlameIcon color="#9354FF" width={41} height={33} />
          <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-background">
            Your store statistics
          </h3>
        </div>

      <section className="flex w-full justify-between">
        <StarShopCard className='w-[30%]'>
          <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2 uppercase">
            Store statistics
          </h4>
          <Statistics />
        </StarShopCard>

        <StarShopCard className='w-[60%]'>
          <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
            SELLS PER MONTH
          </h4>
          <SellsPerMonth />
        </StarShopCard>
      </section>
    </div>
  );
};

export default DashboardComponent;
