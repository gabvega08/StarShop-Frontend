import { useRouter } from "next/router";
import Link from "next/link";

// Placeholder Order Details Data
const orderDetails = {
  "1": { id: "1", product: "Premium Hoodie", store: "Urban Style", status: "In Transit", statusColor: "bg-blue-500", total: "85 XLM", eta: "March 18, 2024", description: "A stylish premium hoodie made from organic cotton." },
  "2": { id: "2", product: "Urban Sneakers", store: "Sneaker Haven", status: "Delivered", statusColor: "bg-green-500", total: "120 XLM", eta: "Delivered on March 12, 2024", description: "High-quality sneakers designed for comfort and style." },
  "3": { id: "3", product: "Graphic T-Shirt", store: "Graphic Tees Co.", status: "Delivered", statusColor: "bg-green-500", total: "35 XLM", eta: "Delivered on March 8, 2024", description: "A bold graphic T-shirt printed with eco-friendly inks." },
  "4": { id: "4", product: "Wireless Earbuds", store: "Tech Gadgets", status: "Processing", statusColor: "bg-yellow-500", total: "75 XLM", eta: "Ships in 24 hours", description: "Premium wireless earbuds with noise cancellation." },
};

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const order = typeof id === "string" ? orderDetails[id as keyof typeof orderDetails] : undefined;

  if (!order) return <p className="text-center text-white mt-10">Order Not Found</p>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-[#0F0E1D] text-white">
      
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

      <div className="w-full max-w-[800px] p-6 bg-[#13122A] rounded-lg border border-white/10 shadow-md">
        <h2 className="text-xl font-bold">{order.product}</h2>
        <p className="text-gray-400">{order.store}</p>
        <p className="text-gray-300 mt-2">{order.description}</p>

        <div className="mt-4">
          <span className={`px-3 py-1 text-sm text-white rounded-full ${order.statusColor}`}>
            {order.status}
          </span>
        </div>

        <p className="mt-4"><strong>Total:</strong> {order.total}</p>
        <p><strong>ETA:</strong> {order.eta}</p>

        <Link href="/orders">
          <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-md">Back to Orders</button>
        </Link>
      </div>
    </div>
  );
}
