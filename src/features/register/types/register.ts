export type RegisterStep =
  | 'select-profile'
  | 'register-form'
  | 'connect-wallet';

export type UserProfile = 'buyer' | 'seller';

export interface RegisterData {
  profile: UserProfile | null;
  name: string;
  email: string;
  walletAddress: string;
}

export interface StepperStep {
  id: number;
  title: string;
  description: string;
  step: RegisterStep;
}
