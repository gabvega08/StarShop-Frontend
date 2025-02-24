import SalesGoalCard from "./components/SalesGoalCard";

const salesData = [
  {
    status: "In-progress",
    statusColor: "#3B82F61A",
    textColor: "#60A5FA",
    title: "Monthly Sales Goal",
    subtitle: "Target revenue for this month",
    target: "$15,000",
    progress: 65,
    thisMonth: "This Month",
  },
  {
    status: "On Track",
    statusColor: "#34D3991A",
    textColor: "#34D399",
    title: "Customer Growth",
    subtitle: "New customer acquisition",
    target: "500 customers",
    progress: 80,
    thisMonth: "This Quarter",
  },
  {
    status: "Needs Attention",
    statusColor: "#FACC151A",
    textColor: "#FACC15",
    title: "Needs Attention",
    subtitle: "Customer feedback goal",
    target: "100 reviews",
    progress: 45,
    thisMonth: "This Month",
  },
];

const StorePerformance: React.FC = () => {
  return (
    <>
      <section className="text-white">
        <h3 className="font-medium text-[28px]  ">Store Performance</h3>
        <article className="flex gap-4 md:flex-row flex-col flex-wrap ">
          {salesData.map((data, index) => (
            <SalesGoalCard key={index} {...data} />
          ))}
        </article>
      </section>
    </>
  );
};

export default StorePerformance;
