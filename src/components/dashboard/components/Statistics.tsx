import React from "react";

const STATIC_DATA = [
  {
    id: 0,
    title: "Satisfied customers:",
    value: "+1000",
  },
  {
    id: 1,
    title: "Total orders:",
    value: "+5000",
  },
  {
    id: 2,
    title: "Total earnings:",
    value: "$5000",
  },
];

export const Statistics = () => {
  return (
    <div className="flex flex-col justify-center gap-6 w-full mt-4">
      {STATIC_DATA.map((data) => (
        <p key={data.id}>
          {data.title}
          <span className="ml-5 border rounded-[6px] px-2 border-custom-light-purple text-custom-light-purple">
            {data.value}
          </span>
        </p>
      ))}
    </div>
  );
};
