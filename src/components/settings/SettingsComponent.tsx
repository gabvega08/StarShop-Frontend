"use client";

import React from "react";
import Bounded from "../ui/Bounded";
import UploadPhotoProfile from "../ui/UploadPhotoProfile";
import Wrapper from "../ui/Wrapper";
import Input from "../ui/Input";
import { MapPinned, ShoppingCart, Store } from "lucide-react";
import { NotebookText } from "lucide-react";
import Select from "../ui/Select";

const SettingsComponent: React.FC = () => {
  return (
    <>
      <Bounded>
        <section className="flex flex-col justify-center items-center gap-5">
          <UploadPhotoProfile />
          <h2 className="uppercase font-bold italic text-2xl">
            Edit your store information
          </h2>

          <Wrapper className="p-10 w-96">
            <form className="flex w-4/5 flex-col gap-10 py-5">
              <Input
                label="Name"
                placeholder="Enter your store name"
                id="name"
                name="name"
                type="text"
                icon={Store}
              />

              <Input
                label="Description"
                placeholder="Enter your store description"
                id="description"
                name="description"
                type="text"
                icon={NotebookText}
              />

              <Select
                label="Product"
                placeholder="Product Type"
                id="product"
                name="product"
                options={[
                  { value: "electronics", label: "Electronics" },
                  { value: "clothing", label: "Clothing" },
                  { value: "groceries", label: "Groceries" },
                ]}
                icon={ShoppingCart}
              />

              <Input
                label="Location"
                placeholder="Enter your location"
                id="location"
                name="location"
                type="text"
                icon={MapPinned}
              />
            </form>
          </Wrapper>
        </section>
      </Bounded>
    </>
  );
};

export default SettingsComponent;
