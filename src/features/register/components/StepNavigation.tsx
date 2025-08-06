'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepButtonProps {
  direction: 'back' | 'next';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const StepButton: React.FC<StepButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  className = '',
}) => {
  const isBack = direction === 'back';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          isBack
            ? 'bg-custom-light-card-background border border-sidebarBorder text-sidebarText hover:bg-sidebarBorder/20'
            : 'bg-sidebarActive text-white hover:bg-sidebarActive/90 shadow-lg shadow-sidebarActive/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${className}
      `}
    >
      {isBack ? (
        <>
          <ChevronLeft className="w-4 h-4" />
          Back
        </>
      ) : (
        <>
          Next
          <ChevronRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
};

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  className?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <StepButton direction="back" onClick={onBack} disabled={!canGoBack} />
      <StepButton direction="next" onClick={onNext} disabled={!canGoNext} />
    </div>
  );
};
