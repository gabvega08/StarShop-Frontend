export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateRegistrationData = (
  name: string, 
  email: string, 
  userType: 'buyer' | 'seller'
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!validateName(name)) {
    const fieldName = userType === 'buyer' ? 'Full name' : 'Store name';
    errors.push(`${fieldName} must be at least 2 characters long`);
  }

  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 