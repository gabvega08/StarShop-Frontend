import { Package } from "lucide-react";

interface UserProfileOrderItemProps {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: "processing" | "delivered" | "cancelled" | "in-transit";
}

const UserProfileOrderItem = ({ title, date, id, amount, status }: UserProfileOrderItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return {
          bg: "bg-yellow-900/30",
          text: "text-yellow-400"
        };
      case "in-transit":
        return {
          bg: "bg-blue-900/30",
          text: "text-blue-400"
        };
      case "delivered":
        return {
          bg: "bg-green-900/30",
          text: "text-green-400"
        };
      case "cancelled":
        return {
          bg: "bg-red-900/30",
          text: "text-red-400"
        };
      default:
        return {
          bg: "bg-gray-900/30",
          text: "text-gray-400"
        };
    }
  };

  const statusColors = getStatusColor(status);

  return (
    <div className={`flex items-center p-4 rounded-lg ${statusColors.bg}`}>
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${statusColors.bg}`}
      >
        <Package className={`${statusColors.text} w-5 h-5`} />
      </div>

      <div className="ml-4 flex-1">
        <h4 className="text-base font-medium text-white">{title}</h4>
        <p className="text-sm text-gray-400">{date} • {id}</p>
      </div>

      <div className="text-right">
        {/* Optional price in this component */}
        {/* <p className="text-lg font-semibold text-white">
          ${amount.toFixed(2)}
        </p> */}
        <p className={`text-sm font-medium ${statusColors.text} capitalize`}>
          {status}
        </p>
        <button className={`text-sm text-gray-400 hover:underline mt-1`}>
          Track order
        </button>
      </div>
    </div>
  );
};

export default UserProfileOrderItem;
