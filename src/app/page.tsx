import LandingPageComponent from "@/components/landing-page/LandingComponent";
import TicketOverview from "@/components/features/user/support/components/TicketOverview";

const demoStats = {
  total: 24,
  weeklyIncrease: 3,
  open: {
    count: 8,
    urgent: 2
  },
  inProgress: {
    count: 12,
    avgDays: 2.3
  },
  resolved: {
    count: 4,
    lastWeek: 7
  },
  responseTime: {
    average: 4.2,
    target: 4,
    sla: 8
  }
};

export default function LadingPage() {
  return (
    <>
      <LandingPageComponent />
      <TicketOverview stats={demoStats} />
    </>
  );
}
