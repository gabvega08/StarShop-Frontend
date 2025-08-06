import { useMutation } from '@tanstack/react-query';
import { RegisterData, RegisterResponse } from '../types/register';
import { RegisterService } from '../services/register.service';

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: (registerData: RegisterData) =>
      RegisterService.register(registerData),
    onError: error => {
      console.error('Registration failed:', error);
    },
  });
};
