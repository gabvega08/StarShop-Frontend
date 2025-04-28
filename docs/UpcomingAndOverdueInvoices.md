# UpcomingAndOverdueInvoices Component Implementation

## Overview
The `UpcomingAndOverdueInvoices` component provides users with a clear view of their upcoming payment deadlines and overdue invoices. It consists of two main panels displayed side by side on desktop and stacked on mobile devices.

## Features Implemented

### Upcoming Due Dates Panel
- Displays invoices that are due soon
- Shows for each invoice:
  - Store name
  - Invoice ID
  - Due date
  - Amount in XLM
  - Days remaining until due
- Interactive cards with purple hover effect
- "View Calendar" action button
- Hover states with subtle purple highlights

### Overdue Invoices Panel
- Displays invoices that are past their due date
- Shows for each invoice:
  - Store name
  - Invoice ID
  - Due date
  - Amount in XLM
  - Number of days overdue
- Interactive cards with red hover effect
- "Send Payment Reminders" action button
- Hover states with subtle red highlights

## Technical Implementation

### Component Location
```
src/features/user/invoices/components/UpcomingAndOverdueInvoices.tsx
```

### Key Features
- **Responsive Design**: 
  - Desktop: Two-column grid layout
  - Mobile: Single-column stacked layout
  - Breakpoint: 768px (md)

- **Interactive Elements**:
  - Smooth transitions on hover states
  - Visual feedback on interactive elements
  - Consistent hover effects across both panels

- **Styling**:
  - Dark theme with subtle gradients
  - Color-coded status indicators
  - Consistent typography and spacing
  - Accessible color contrasts

### Data Structure
```typescript
interface Invoice {
  id: string;
  store: string;
  date: string;
  amount: number;
  currency: string;
  daysLeft?: number;    // for upcoming invoices
  daysOverdue?: number; // for overdue invoices
}
```

## Design Considerations

### Colors
- **Upcoming Panel**:
  - Base: rgba(255, 255, 255, 0.05)
  - Hover: rgba(168, 85, 247, 0.1)
  - Border Hover: rgba(168, 85, 247, 0.2)

- **Overdue Panel**:
  - Base: rgba(239, 68, 68, 0.1)
  - Hover: rgba(239, 68, 68, 0.2)
  - Border Hover: rgba(239, 68, 68, 0.3)

### Typography
- Headers: text-lg font-medium
- Store Names: font-medium
- Details: text-sm
- Status Text: Color-coded (yellow for upcoming, red for overdue)

## Future Improvements
- Add click handlers for invoice cards
- Implement calendar view functionality
- Add payment reminder sending functionality
- Add sorting and filtering options
- Implement real-time updates for days remaining/overdue 