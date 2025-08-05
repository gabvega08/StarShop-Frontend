export interface StatsCardData {
  title: string;
  value: number;
  textColor: string;
}

export interface Transaction {
  reference: string;
  description: string;
  amount: number;
  status: string;
  date: string;
  type: 'credit' | 'debit';
} 