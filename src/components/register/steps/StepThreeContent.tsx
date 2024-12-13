"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import UploadPhotoProfile from "@/components/ui/UploadPhotoProfile";
import { Store, Newspaper, ShoppingCart, MapPinnedIcon } from "lucide-react";

export default function StepThreeContent(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center mt-2">
        <UploadPhotoProfile />
        <div className="flex flex-col items-center justify-center w-[428px] px-14 pt-8 pb-14 bg-[#0F102C] rounded-[3rem] shadow-lg border-4 border-[#3D3C75]">
          <div className="w-full space-y-4">
            <div className="flex flex-col w-full mt-0">
              <label className="text-white text-lg text-center font-bold italic mb-2">
                NAME
              </label>
              <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                <Store className="w-5 h-5 text-white" />
                <input
                  type="text"
                  placeholder="Enter your store name"
                  className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-white text-lg text-center font-bold italic mb-2">
                DESCRIPTION
              </label>
              <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                <Newspaper className="w-5 h-5 text-white" />
                <input
                  type="email"
                  placeholder="Enter your store description"
                  className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
              </div>
            </div>

            <div className="flex flex-col w-full mb-16">
              <label className="text-white text-lg text-center font-bold italic mb-2">
                PRODUCT
              </label>
              <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                <ShoppingCart className="w-5 h-5 text-white" />

                <div className="flex w-full items-center justify-center ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Product Type</SelectLabel>
                        <SelectItem value="Convinience">Convinience</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Specialty">Specialty</SelectItem>
                        <SelectItem value="Unsort">Unsort</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
              </div>
            </div>

            <div className="flex flex-col w-full mb-16">
              <label className="text-white text-lg text-center font-bold italic mb-2">
                LOCATION
              </label>
              <div className="flex items-center w-full px-4 py-2 bg-[#302F54] rounded-md relative">
                <MapPinnedIcon className="w-5 h-5 text-white" />

                <input
                  type="text"
                  placeholder="Enter your location"
                  className="flex-1 ml-4 text-sm text-white placeholder-white bg-transparent text-center focus:outline-none"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7649CB] rounded-b-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
