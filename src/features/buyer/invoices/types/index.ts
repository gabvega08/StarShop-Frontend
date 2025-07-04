export interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  description: string;
  date: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: InvoiceItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  paymentReceived?: boolean;
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  billingInfo: BillingInfo;
}

export interface InvoiceItem {
  name: string;
  description: string;
  amount: string;
}

export interface BillingInfo {
  name: string;
  company: string;
  address: string;
  location: string;
}
