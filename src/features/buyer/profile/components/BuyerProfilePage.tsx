import { ProfileCard } from './ProfileCard';
import { ShoppingActivity } from './ShoppingActivity';
import { RecentOrders } from './RecentOrders';
import { DeliveryCalendar } from './DeliveryCalendar';

export function BuyerProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <ProfileCard />
            <ShoppingActivity />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <RecentOrders />
            <DeliveryCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
