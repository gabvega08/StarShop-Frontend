import React, { useState } from "react";

const ManualPayment: React.FC = () => {
  const [xlmAmount, setXlmAmount] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder logic until backend integration is ready
    console.log("Manual Payment Submitted:", { xlmAmount, memo });

    setXlmAmount("");
    setMemo("");
  };

  return (
    <div className="space-y-6 p-3 sm:p-6 bg-starshopBackground">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Make a Manual Payment
        </h1>
      </div>

      {/* Main Container */}
      <div className="bg-transparent border border-white/20 shadow-[0px_2px_8px_2px_rgba(255,255,255,0.15)] rounded-lg">
        {/* Form with onSubmit */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          {/* Row with Inputs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-around bg-opacity-30 rounded-lg space-y-3 sm:space-y-0 sm:gap-4">
            {/* XLM Amount Field */}
            <div className="flex-1">
              <label
                htmlFor="xlmAmount"
                className="block text-sm font-medium mb-2 text-white"
              >
                XLM Amount
              </label>
              <input
                id="xlmAmount"
                type="number"
                placeholder="0.0"
                value={xlmAmount}
                onChange={(e) => setXlmAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
              />
            </div>

            {/* Memo Field */}
            <div className="flex-1">
              <label
                htmlFor="memo"
                className="block text-sm font-medium mb-2 text-white"
              >
                Memo (Optional)
              </label>
              <input
                id="memo"
                type="text"
                placeholder="Enter memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600
                           focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-md bg-[#9333EA] hover:bg-[#7E22D9]
                       transition-colors font-medium text-white"
          >
            Send XLM Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManualPayment;
