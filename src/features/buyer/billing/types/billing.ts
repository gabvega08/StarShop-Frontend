export interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface PaymentMethod {
  id: string;
  type: 'stellar' | 'credit_card' | 'bank_transfer';
  name: string;
  isDefault: boolean;
  lastFour?: string;
}

export interface Subscription {
  id: string;
  plan: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  status: 'active' | 'cancelled' | 'paused';
}

export interface StellarWallet {
  address: string;
  balance: string;
  isConnected: boolean;
}

export interface SendXLMForm {
  recipientAddress: string;
  amount: string;
  memo?: string;
} 