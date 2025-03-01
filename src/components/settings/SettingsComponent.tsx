"use client";

import React, { useEffect, useState } from "react";

const NewSettings: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-10 bg-[url('/path-to-your-background-image.png')] bg-cover bg-no-repeat">
      <div className="w-full max-w-[70%] p-10 rounded-3xl">
        <h1
          className={`text-[2.8rem] font-normal text-white mb-2 relative text-left transition-opacity duration-700 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Store Settings
          <span className="absolute inset-0 text-white blur-[4px] opacity-80 animate-pulse">
            Store Settings
          </span>
        </h1>

        <h2 className="text-2xl text-white font-semibold mb-8 text-left">
          General Information
        </h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xl text-white font-semibold">
              Store Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your store name"
                className="w-full p-3 pl-4 text-white bg-transparent border border-[#4B3F72] rounded-md focus:outline-none focus:border-purple-600 transition duration-300 ease-in-out"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl text-white font-semibold">
              Store Description
            </label>
            <div className="relative">
              <textarea
                placeholder="Enter your store description"
                className="w-full p-3 pl-4 text-white bg-transparent border border-[#4B3F72] rounded-md focus:outline-none focus:border-purple-600 transition duration-300 ease-in-out"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl text-white font-semibold">
              Contact Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your contact email"
                className="w-full p-3 pl-4 text-white bg-transparent border border-[#4B3F72] rounded-md focus:outline-none focus:border-purple-600 transition duration-300 ease-in-out"
              />
            </div>
          </div>

         

          <div className="flex justify-start w-full">
            <button
              type="submit"
              className="px-6 py-3 mt-4 text-white bg-purple-600 rounded-lg transition duration-300 ease-in-out hover:bg-purple-700 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewSettings;
