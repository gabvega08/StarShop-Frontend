'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { StepperStep } from '../types/register';

interface StepperProps {
  currentStep: number;
  steps: StepperStep[];
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-sidebarActive shadow-lg shadow-sidebarActive/30'
                        : isCurrent
                          ? 'bg-sidebarActive ring-4 ring-sidebarActive/20 shadow-lg'
                          : 'bg-custom-light-card-background border-2 border-sidebarBorder'
                    }
                    ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`
                      text-xs font-semibold
                      ${isCurrent ? 'text-white' : 'text-sidebarText'}
                    `}
                    >
                      {step.id}
                    </span>
                  )}
                </button>

                <div className="mt-2 text-center max-w-24">
                  <h3
                    className={`
                    text-xs font-semibold mb-0.5
                    ${isCompleted || isCurrent ? 'text-white' : 'text-sidebarText'}
                  `}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`
                    text-xs
                    ${isCompleted || isCurrent ? 'text-gray-300' : 'text-sidebarText/70'}
                  `}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`
                    h-0.5 rounded-full transition-all duration-300
                    ${isCompleted ? 'bg-sidebarActive' : 'bg-sidebarBorder'}
                  `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
