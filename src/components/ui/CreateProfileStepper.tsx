"use client"

import React, { useState } from "react";
import { ArrowRight } from 'lucide-react';

const steps = ["Step 1", "Step 2", "Step 3"];
const stepContent = [
  "This is the content for step 1.",
  "This is the content for step 2.",
  "This is the content for step 3.",
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-8 rounded-xl min-w-[600px]">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-lg ${
                currentStep === index + 1
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                  : index + 1 < currentStep
                  ? "bg-purple-600/20 text-purple-300"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {index + 1}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-24 transition-all duration-300 ${
                  currentStep > index + 1 ? "bg-purple-600" : "bg-white/10"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-lg text-white/90 font-medium">
        {stepContent[currentStep - 1]}
      </div>
      <div className="flex space-x-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-2.5 rounded-full text-white font-medium transition-all duration-300 ${
            currentStep === 1
              ? "bg-white/10 text-white/50 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25"
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className={`px-6 py-2.5 rounded-full text-white font-medium flex items-center space-x-2 transition-all duration-300 ${
            currentStep === steps.length
              ? "bg-white/10 text-white/50 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25"
          }`}
        >
          <span>Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Stepper;

