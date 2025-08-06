export type RegisterStep = 'select-profile' | 'register-form';

export type UserProfile = 'buyer' | 'seller';

export interface RegisterData {
  profile: UserProfile | null;
  name: string;
  email: string;
}

export interface StepperStep {
  id: number;
  title: string;
  description: string;
  step: RegisterStep;
}
