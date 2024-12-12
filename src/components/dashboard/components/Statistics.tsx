import React from "react";

export const Statistics = () => {
  return (
    <div className="flex flex-col justify-start items-start py-6 gap-6 w-full">
      <p>
        Satisfied customers:{" "}
        <span className="ml-10 border rounded-[6px] px-2 py-0 border-custom-light-purple text-custom-light-purple">
          +1000
        </span>
      </p>
      <p>
        Total orders: <span className="ml-10 border rounded-[6px] px-2 py-0 border-custom-light-purple text-custom-light-purple">+5000</span>
      </p>
      <p>
        Total earnings: <span className="ml-10 border rounded-[6px] px-2 py-0 border-custom-light-purple text-custom-light-purple">$5000</span>
      </p>
    </div>
  );
};
