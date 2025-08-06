'use client';

import React from 'react';
import { useRegisterFlow } from '../hooks/useRegisterFlow';
import { Stepper } from './Stepper';
import { StepNavigation } from './StepNavigation';
import { ProfileSelection } from './ProfileSelection';
import { RegisterForm } from './RegisterForm';
import { REGISTER_STEPS } from '../constants/register';

export const RegisterFlow: React.FC = () => {
  const {
    currentStep,
    selectedProfile,
    formData,
    canGoBack,
    canGoNext,
    canSubmit,
    handleProfileSelect,
    handleBack,
    handleNext,
    updateFormData,
    handleSubmit,
  } = useRegisterFlow();

  const currentStepNumber = currentStep === 'select-profile' ? 1 : 2;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-2 pb-8">
        <Stepper
          currentStep={currentStepNumber}
          steps={REGISTER_STEPS}
          onStepClick={(stepId) => {
            if (stepId === 1) {
              handleBack();
            }
          }}
        />
        
        <div className="mt-4">
          {currentStep === 'select-profile' ? (
            <ProfileSelection
              selectedProfile={selectedProfile}
              onProfileSelect={handleProfileSelect}
            />
          ) : (
            <RegisterForm
              userType={selectedProfile!}
              formData={formData}
              onUpdateFormData={updateFormData}
            />
          )}
        </div>
        
        <div className="mt-6">
          <StepNavigation
            onBack={handleBack}
            onNext={currentStep === 'register-form' ? handleSubmit : handleNext}
            canGoBack={canGoBack}
            canGoNext={currentStep === 'register-form' ? Boolean(canSubmit) : canGoNext}
          />
        </div>
      </div>
    </div>
  );
}; 