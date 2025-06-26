export interface InvoiceItem {
  name: string;
  size: string;
  quantity: number;
  amount: number;
  currency: string;
}

export interface ShippingInfo {
  method: string;
  cost: number;
  currency: string;
}

export interface PaymentDetails {
  received: boolean;
  date?: string;
  transactionId?: string;
  method?: string;
}

export interface BillingInformation {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  stellarAddress: string;
}

export interface InvoiceDetails {
  items: InvoiceItem[];
  shipping: ShippingInfo;
  paymentDetails: PaymentDetails;
  billingInformation: BillingInformation;
}

export interface Invoice {
  id: string;
  item: string;
  store: string;
  date: string;
  status: string;
  statusColor: string;
  details: InvoiceDetails;
}

export interface InvoiceTable {
  id: string;
  client: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: InvoiceStatus;
}

export interface Filter {
  id: string;
  type: 'date' | 'amount';
  operator: string;
  value: string;
  display: string;
  preset?: string;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export type SortKey = keyof Invoice;
export type SortOrder = 'asc' | 'desc';
