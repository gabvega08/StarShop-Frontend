import { ArrowRight } from "lucide-react";
import { Cuboid } from "lucide-react";

interface TransactionProps {
  id: string;
  product: string;
  title: string;
  date: string;
  amount: number;
  state: string;
  status: "Completed" | "Failed" | "Processing";
  type: "income" | "expense";
}

const transactions: TransactionProps[] = [
  {
    id: "TX123456",
    title: "Order #8832 - John D.",
    product: "Premium Hoodie (Black)",
    date: "Mar 15, 2024",
    amount: 156.0,
    state: "paid",
    status: "Completed",
    type: "income",
  },
  {
    id: "TX123455",
    title: "Order #8831 - Sarah M.",
    product: "Urban Pants Gray",
    date: "Mar 14, 2024",
    amount: -890.0,
    state: "Processing",
    status: "Processing",
    type: "expense",
  },
  {
    id: "TX123454",
    title: "Order #8830 - Jane D.",
    product: "Graphic T-Shirt White",
    date: "Mar 13, 2024",
    amount: 89.99,
    state: "Shipped",
    status: "Completed",
    type: "income",
  },
  {
    id: "TX123453",
    title: "Order #8830 - James V",
    product: "Limited Sneakers",
    date: "Mar 12, 2024",
    amount: 129.99,
    state: "Paid",
    status: "Completed",
    type: "income",
  },
];

const TransactionCard = ({
  product,
  title,
  amount,
  state,
  status,
}: TransactionProps) => {
  const getStateStyles = (state: string) => {
    switch (state.toLowerCase()) {
      case "paid":
        return "text-emerald-500";
      case "processing":
        return "text-amber-500";
      case "shipped":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const statusColors = {
    Completed: {
      bg: "bg-green-900/30",
      icon: "text-green-400",
      text: "text-green-400",
    },
    Failed: {
      bg: "bg-red-900/30",
      icon: "text-red-400",
      text: "text-red-400",
    },
    Processing: {
      bg: "bg-yellow-900/30",
      icon: "text-yellow-400",
      text: "text-yellow-400",
    },
  };

  const { bg, icon } = statusColors[status] || statusColors.Processing;

  return (
      <div className="flex items-center p-4 sm:p-6 border-[#242332] border-y z-50">
        {/* Icon Container */}
        <div
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bg}`}
        >
          <Cuboid className={`${icon} w-4 h-4 sm:w-5 sm:h-5`} />
        </div>
    
        {/* Text Content */}
        <div className="ml-3 sm:ml-4 flex-1">
          <h4 className="text-sm sm:text-base md:text-xl font-medium text-white">
            {product}
          </h4>
          <p className="text-xs sm:text-sm text-gray-400 md:text-base">{title}</p>
        </div>
    
        {/* Amount and State */}
        <div className="text-right">
          <p className="text-base sm:text-lg font-semibold text-white">
            ${Math.abs(amount).toFixed(2)}
          </p>
          <p className={`text-xs sm:text-sm ${getStateStyles(state)}`}>{state}</p>
        </div>
      </div>
    );
};

const RecentOrders = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-soft-light"></div>
      </div>

      <div className="relative p-4 rounded-lg shadow-md bg-transparent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-normal text-white">Recent Orders</h2>
          <span className="text-gray-500 text-lg md:text-2xl">Today</span>
        </div>

        <div className="md:border md:rounded-2xl overflow-hidden border-[#1e1c38] shadow-2xl">
          <div className="bg-yellow-900/5">
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} {...tx} />
            ))}
          </div>

          <div className="w-full flex justify-center items-end p-4 bg-yellow-900/5">
            <button className="text-white flex flex-row font-thin justify-between items-center p-2 rounded-2xl w-40 hover:bg-[#1e1c38] transition-all duration-200">
              View All Orders
              <ArrowRight className="font-thin h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
