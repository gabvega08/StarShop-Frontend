import { User } from '@/shared/types';

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

export interface RegisterResponse {
  success: boolean;
  data: {
    user: {
      id: number; // ! Important: @santi @kevin. You shouldnt return the id from the db
      User: User;
    };
    expiresIn: number;
  };
}

export interface StepperStep {
  id: number;
  title: string;
  description: string;
  step: RegisterStep;
}
