import { Invoice } from "../types/invoice";

export const sampleInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    item: "Premium Hoodie (Black)",
    store: "Urban Style Store",
    date: "March 15, 2024",
    status: "Paid",
    statusColor: "green",
    details: {
      items: [{
        name: "Premium Hoodie (Black)",
        size: "L",
        quantity: 1,
        amount: 80,
        currency: "XLM"
      }],
      shipping: {
        method: "Standard Delivery",
        cost: 5,
        currency: "XLM"
      },
      paymentDetails: {
        received: true,
        date: "2024-03-15",
        transactionId: "TX123456789",
        method: "Stellar XLM"
      },
      billingInformation: {
        name: "Matias Aguilar",
        address: "123 Crypto Street",
        city: "Blockchain City",
        state: "BC",
        zipCode: "12345",
        stellarAddress: "GBCXF...AQTLA"
      }
    }
  },
  {
    id: "INV-2024-002",
    item: "Urban Sneakers (Gray)",
    store: "Sneaker Haven",
    date: "March 10, 2024",
    status: "Paid",
    statusColor: "green",
    details: {
      items: [{
        name: "Urban Sneakers (Gray)",
        size: "42",
        quantity: 1,
        amount: 120,
        currency: "XLM"
      }],
      shipping: {
        method: "Express Delivery",
        cost: 10,
        currency: "XLM"
      },
      paymentDetails: {
        received: true,
        date: "2024-03-10",
        transactionId: "TX123456790",
        method: "Stellar XLM"
      },
      billingInformation: {
        name: "John Doe",
        address: "456 Blockchain Ave",
        city: "Crypto Valley",
        state: "CV",
        zipCode: "67890",
        stellarAddress: "GDXYZ...MNOPQ"
      }
    }
  },
  {
    id: "INV-2024-003",
    item: "Wireless Earbuds",
    store: "Tech Gadgets",
    date: "March 5, 2024",
    status: "Pending",
    statusColor: "yellow",
    details: {
      items: [{
        name: "Wireless Earbuds",
        size: "One Size",
        quantity: 1,
        amount: 75,
        currency: "XLM"
      }],
      shipping: {
        method: "Standard Delivery",
        cost: 5,
        currency: "XLM"
      },
      paymentDetails: {
        received: false
      },
      billingInformation: {
        name: "Alice Smith",
        address: "789 Tech Street",
        city: "Silicon Valley",
        state: "SV",
        zipCode: "54321",
        stellarAddress: "GABC...WXYZ"
      }
    }
  },
  {
    id: "INV-2024-004",
    item: "Sustainable Water Bottle",
    store: "Eco Friendly Shop",
    date: "February 28, 2024",
    status: "Overdue",
    statusColor: "red",
    details: {
      items: [{
        name: "Sustainable Water Bottle",
        size: "500ml",
        quantity: 1,
        amount: 25,
        currency: "XLM"
      }],
      shipping: {
        method: "Standard Delivery",
        cost: 5,
        currency: "XLM"
      },
      paymentDetails: {
        received: false
      },
      billingInformation: {
        name: "Bob Johnson",
        address: "321 Green Street",
        city: "Eco City",
        state: "EC",
        zipCode: "98765",
        stellarAddress: "GDEF...UVWX"
      }
    }
  }
];