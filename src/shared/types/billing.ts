export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: 'Confirmed' | 'Pending' | 'Failed';
}

export interface Plan {
  name: string;
  price: string;
  description: string;
  nextBillingDate: string;
}

export interface WalletInfo {
  address: string;
  balance: string;
} 