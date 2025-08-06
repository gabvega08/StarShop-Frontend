'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterStep, UserProfile, RegisterData } from '../types/register';
import { useSetRole, useSetName, useSetEmail, useUserRole, useUserName, useUserEmail } from '@/shared/stores';

export const useRegisterFlow = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegisterStep>('select-profile');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<RegisterData>({
    profile: null,
    name: '',
    email: '',
  });

  const setRole = useSetRole();
  const setName = useSetName();
  const setEmail = useSetEmail();
  const savedRole = useUserRole();
  const savedName = useUserName();
  const savedEmail = useUserEmail();

  useEffect(() => {
    if (savedRole && (savedRole === 'buyer' || savedRole === 'seller')) {
      setSelectedProfile(savedRole);
      setFormData(prev => ({ ...prev, profile: savedRole }));
    }
  }, [savedRole]);

  useEffect(() => {
    if (savedName) {
      setFormData(prev => ({ ...prev, name: savedName }));
    }
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, [savedName, savedEmail]);

  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setFormData(prev => ({ ...prev, profile }));
    setRole(profile);
  };

  const handleBack = () => {
    if (currentStep === 'register-form') {
      setCurrentStep('select-profile');
    }
  };

  const handleNext = () => {
    if (currentStep === 'select-profile' && selectedProfile) {
      setCurrentStep('register-form');
    }
  };

  const updateFormData = (field: keyof Omit<RegisterData, 'profile'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    }
  };

  const canProceed = selectedProfile !== null;
  const canGoBack = currentStep === 'register-form';
  const canGoNext = currentStep === 'select-profile' && selectedProfile !== null;
  const canSubmit = currentStep === 'register-form' && formData.name.trim() && formData.email.trim();

  const handleSubmit = () => {
    if (canSubmit) {
      setName(formData.name.trim());
      setEmail(formData.email.trim());
      
      if (selectedProfile === 'buyer') {
        router.push('/buyer/dashboard');
      } else {
        router.push('/seller/dashboard');
      }
    }
  };

  return {
    currentStep,
    selectedProfile,
    formData,
    canProceed,
    canGoBack,
    canGoNext,
    canSubmit,
    handleProfileSelect,
    handleBack,
    handleNext,
    updateFormData,
    handleSubmit,
  };
}; 