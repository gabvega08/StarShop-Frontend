import React from "react";
import { ImageContainer } from "./ImageContainer";

export const TopProducts = () => {
  return (
    <div className="flex justify-evenly items-center gap-4 w-full">
      <ImageContainer
        title={"Hoodie angel´s"}
        url="/images/dashboard/HoodieFrontpng1.png"
        urlshadow="/images/dashboard/HoodieFrontpng2.png"
      />
      <ImageContainer
        title={"Jogger focus"}
        url="/images/dashboard/FrontJoggersBlack1.png"
        urlshadow="/images/dashboard/FrontJoggersBlack2.png"
      />
      <ImageContainer
        title={"Oversize Focus"}
        url="/images/dashboard/T-ShirtOversize.png"
        urlshadow="/images/dashboard/T-ShirtOversize2.png"
      />
    </div>
  );
};
