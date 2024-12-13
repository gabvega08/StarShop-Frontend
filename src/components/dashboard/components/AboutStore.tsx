import React from "react";

const STATIC_DATA = [
  {
    id: 0,
    title: "Product:",
    value: "Clothing Store",
  },
  {
    id: 1,
    title: "Owner",
    value: "aguilar1x",
  },
];

export const AboutStore = () => {
  return (
    <div className="flex flex-col justify-center items-center py-6 gap-8">
      {STATIC_DATA.map((data) => (
        <p key={data.id} className="text-[23px]">
          {data.title} {data.value}
        </p>
      ))}
    </div>
  );
};
