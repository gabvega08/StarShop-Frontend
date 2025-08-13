'use client';
import { useUserStore } from '@/shared/stores/userStore';
import { validateRegistrationData } from '../utils/validation';
import { useRouter } from 'next/navigation';

export const useRegistration = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleRegistration = (
    fullName: string,
    email: string,
    role: 'buyer' | 'seller'
  ) => {
    // Validar los datos
    const validation = validateRegistrationData(fullName, email, role);

    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      return;
    }

    // Guardar en el userStore existente
    setUser({
      name: fullName,
      email,
      role,
    });

    // Redirigir según el tipo de usuario
    if (role === 'buyer') {
      router.push('/buyer/dashboard');
    } else {
      router.push('/seller/dashboard');
    }
  };

  return {
    handleRegistration,
  };
};
