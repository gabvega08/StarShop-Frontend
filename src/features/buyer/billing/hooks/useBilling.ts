import { useState, useCallback } from 'react';
import type { PaymentMethod, SendXLMForm } from '../types/billing';

export const useBilling = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendXLM = useCallback(
    async (formData: SendXLMForm): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate Stellar address format
        if (!formData.recipientAddress.match(/^G[A-Z0-9]{55}$/)) {
          throw new Error('Invalid Stellar address format');
        }

        // Validate amount
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
          throw new Error('Valid amount is required');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refreshWalletBalance = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return '345.6789';
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to refresh balance'
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPaymentMethod = useCallback(
    async (
      method: Omit<PaymentMethod, 'id'>
    ): Promise<PaymentMethod | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
          ...method,
          id: `pm_${Date.now()}`,
        };
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to add payment method'
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendXLM,
    refreshWalletBalance,
    addPaymentMethod,
  };
};
