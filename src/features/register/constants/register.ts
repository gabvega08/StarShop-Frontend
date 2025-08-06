import { StepperStep } from '../types/register';

export const REGISTER_STEPS: StepperStep[] = [
  {
    id: 1,
    title: 'Select Profile',
    description: 'Account type',
    step: 'select-profile',
  },
  {
    id: 2,
    title: 'Register',
    description: 'Your info',
    step: 'register-form',
  },
  {
    id: 3,
    title: 'Connect Wallet',
    description: 'Stellar wallet',
    step: 'connect-wallet',
  },
];

export const REGISTRATION_CONSTANTS = {
  FORM: {
    BUYER: {
      NAME_LABEL: 'Full Name',
      NAME_PLACEHOLDER: 'Enter your full name',
    },
    SELLER: {
      NAME_LABEL: 'Store Name',
      NAME_PLACEHOLDER: 'Enter your store name',
    },
    EMAIL_PLACEHOLDER: 'Enter your email address',
    LOADING_TEXT: 'Creating account...',
    SUBMIT_BUTTON_TEXT: 'Create Account',
  },
};
