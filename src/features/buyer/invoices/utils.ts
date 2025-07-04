export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'text-green-300';
    case 'pending':
      return 'text-yellow-300';
    case 'overdue':
      return 'text-red-300';
    default:
      return 'text-gray-400';
  }
};

export const getStatusBg = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-600/10 border border-green-300/30';
    case 'pending':
      return 'bg-yellow-600/10 border border-yellow-300/30';
    case 'overdue':
      return 'bg-red-600/10 border border-red-300/30';
    default:
      return 'bg-white/5 border border-white/10';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return '✓';
    case 'pending':
      return '⏳';
    case 'overdue':
      return '⚠';
    default:
      return '○';
  }
};

export const getStatusDotColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-300';
    case 'pending':
      return 'bg-yellow-300';
    case 'overdue':
      return 'bg-red-300';
    default:
      return 'bg-gray-400';
  }
};
