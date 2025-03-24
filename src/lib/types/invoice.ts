export interface InvoiceItem {
  name: string;
  size: string;
  quantity: number;
  amount: number;
  currency: string;
}

export interface BillingInformation {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  stellarAddress: string;
}

export interface PaymentDetails {
  received: boolean;
  date?: string;
  transactionId?: string;
  method?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
  shipping: {
    method: string;
    cost: number;
    currency: string;
  };
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentDetails: PaymentDetails;
  billingInformation: BillingInformation;
} 