'use client';

import React from 'react';
import { useRegisterFlow } from '../hooks/useRegisterFlow';
import { Stepper } from './Stepper';
import { StepNavigation } from './StepNavigation';
import { ProfileSelection } from './ProfileSelection';
import { RegisterForm } from './RegisterForm';
import { ConnectWalletStep } from './ConnectWalletStep';
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
    handleWalletConnected,
    handleSubmit,
  } = useRegisterFlow();

  const currentStepNumber =
    currentStep === 'select-profile'
      ? 1
      : currentStep === 'register-form'
        ? 2
        : 3;

  return (
    <div className="min-h-screen">
      <div className="container mt-[5rem] mx-auto px-4 pt-2 pb-8">
        <Stepper
          currentStep={currentStepNumber}
          steps={REGISTER_STEPS}
          onStepClick={stepId => {
            if (stepId === 1) {
              handleBack();
            }
          }}
          containerWidth="max-w-2xl"
        />

        <div className="mt-4">
          {currentStep === 'select-profile' ? (
            <ProfileSelection
              selectedProfile={selectedProfile}
              onProfileSelect={handleProfileSelect}
            />
          ) : currentStep === 'register-form' ? (
            <RegisterForm
              userType={selectedProfile!}
              formData={formData}
              onUpdateFormData={updateFormData}
            />
          ) : (
            <ConnectWalletStep
              onWalletConnected={handleWalletConnected}
              isWalletConnected={Boolean(formData.walletAddress)}
              walletAddress={formData.walletAddress}
            />
          )}
        </div>

        <div className="mt-8 px-[18rem]">
          <StepNavigation
            onBack={handleBack}
            onNext={
              currentStep === 'connect-wallet' ? handleSubmit : handleNext
            }
            canGoBack={canGoBack}
            canGoNext={
              currentStep === 'connect-wallet'
                ? Boolean(canSubmit)
                : Boolean(canGoNext)
            }
            isLastStep={currentStep === 'connect-wallet'}
          />
        </div>
      </div>
    </div>
  );
};
