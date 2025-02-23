"use client";

import React from "react";
import UploadPhotoProfile from "../ui/UploadPhotoProfile";
import Wrapper from "../ui/StarShopCard";
import Input from "../ui/Input";
import { MapPinned, Store } from "lucide-react";
import { NotebookText } from "lucide-react";

const SettingsComponent: React.FC = () => {
  return (
    <>
        <section className="flex flex-col justify-center items-center gap-5">
          <UploadPhotoProfile />
          <h2 className="uppercase text-white font-bold italic text-2xl">
            Edit your store information
          </h2>

          <Wrapper className="p-10 w-5/12 bg-custom-light-wrapper-background">
            <form className="flex w-4/5 flex-col gap-5 py-5">
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
    </>
  );
};

export default SettingsComponent;
