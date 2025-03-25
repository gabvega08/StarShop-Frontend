export interface TicketStats {
    total: number;
    weeklyIncrease: number;
    open: {
      count: number;
      urgent: number;
    };
    inProgress: {
      count: number;
      avgDays: number;
    };
    resolved: {
      count: number;
      lastWeek: number;
    };
    responseTime: {
      average: number;
      target: number;
      sla: number;
    };
  }