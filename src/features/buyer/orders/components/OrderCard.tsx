import { SquareArrowOutUpRight } from 'lucide-react';

interface Order {
  product: string;
  store: string;
  date: string;
  status: string;
  statusColor: string;
  textColor: string;
  id: string;
  total: string | number;
  eta: string;
  icon: JSX.Element;
}

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="flex border-white/10 border-b hover:bg-[#1D1C2B20] group">
      <div className="w-1 group-hover:bg-purple-500"></div>

      <div className="flex items-center flex-col md:flex-row gap-4 py-6 px-4 w-full">
        {/* Product Image */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-md mr-4 flex-shrink-0" />

          {/* Product Info and Status */}
          <div className="flex-grow mr-4">
            <h3 className="text-white font-medium text-sm sm:text-base">
              {order.product}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              {order.store} • {order.date}
            </p>
            <div className="mt-2">
              <span
                className={`inline-flex items-center rounded-full ${order.statusColor}`}
              >
                <p
                  className={`flex items-center px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs ${order.textColor}`}
                >
                  {order.icon} {order.status}
                </p>
              </span>
            </div>
          </div>
        </div>

        {/* Order Details - Desktop */}
        <div className="hidden md:flex flex-grow justify-center space-x-16">
          <div className="flex flex-col items-start">
            <p className="text-gray-400 text-sm">Order ID</p>
            <p className="text-white">{order.id}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-white">{order.total}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-gray-400 text-sm">ETA</p>
            <p className="text-white">{order.eta}</p>
          </div>
        </div>

        {/* Order Details - Mobile */}
        <div className="md:hidden w-full mt-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-gray-400 text-xs">Order ID</p>
              <p className="text-white text-xs">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p className="text-white text-xs">{order.total}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">ETA</p>
              <p className="text-white text-xs">{order.eta}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex lg:flex-row items-center gap-4 md:justify-center md:flex-col ml-4 w-full md:w-auto justify-end">
          <button className="flex items-center justify-center gap-1 px-3 py-1.5 border border-white/20 text-white rounded-md hover:bg-white/5 text-xs sm:text-sm max-w-[100px]">
            Track{' '}
            <SquareArrowOutUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </button>
          <button className="px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-xs sm:text-sm max-w-[100px]">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
