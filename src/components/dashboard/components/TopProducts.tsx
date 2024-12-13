import React from "react";
import { ImageContainer } from "./ImageContainer";

const STATIC_DATA = [
  {
    id: 0,
    title: "Hoodie angel´s",
    mainImageUrl: "/images/dashboard/HoodieFrontpng1.png",
    shadowImageUr: "/images/dashboard/HoodieFrontpng2.png",
  },
  {
    id: 1,
    title: "Jogger focus",
    mainImageUrl: "/images/dashboard/FrontJoggersBlack1.png",
    shadowImageUr: "/images/dashboard/FrontJoggersBlack2.png",
  },
  {
    id: 2,
    title: "Oversize Focus",
    mainImageUrl: "/images/dashboard/T-ShirtOversize.png",
    shadowImageUr: "/images/dashboard/T-ShirtOversize2.png",
  },
];

export const TopProducts = () => {
  return (
    <div className="flex justify-evenly items-center gap-4 w-full mt-8">
      {STATIC_DATA.map((data) => (
        <ImageContainer
          key={data.id}
          title={data.title}
          url={data.mainImageUrl}
          urlshadow={data.shadowImageUr}
        />
      ))}
    </div>
  );
};
