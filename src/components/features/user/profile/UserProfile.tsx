'use client';

import Link from 'next/link';
import {Star, Heart, Calendar, ArrowLeft, Package } from 'lucide-react';
import OrderItem from './UserOrderItem';
import StatCard from './StatCard';
import DeliveryCalendar from './DeliveryCalendar';
import UserInfoCard from './UserInfoCard';
import GlowCard from './GlowCard';
import Header from './Header';

interface UserData {
  name: string;
  membershipType: string;
  avatar: string;
  stats: {
    totalOrders: number;
    reviews: number;
    wishlist: number;
  };
  recentOrders: {
    id: string;
    title: string;
    date: string;
    amount: number;
    status: "processing" | "delivered" | "cancelled" | "in-transit";
  }[];
  deliveries: {
    id: number;
    type: string;
    date: string;
  }[];
}

const UserProfile = () => {
  // Placeholder data - to be replaced with real data from backend
  const userData: UserData = {
    name: 'Kevin Latino',
    membershipType: 'Premium Member',
    avatar: '/images/user-profile/avatar.jpg',
    stats: {
      totalOrders: 47,
      reviews: 32,
      wishlist: 15
    },
    recentOrders: [
      {
        id: "ORD-001",
        title: 'Premium Hoodie',
        date: 'March 05, 2024',
        amount: 89.99,
        status: "processing"
      },
      {
        id: "ORD-002",
        title: 'Urban Sneakers',
        date: 'March 08, 2024',
        amount: 129.99,
        status: "delivered"
      },
      {
        id: "ORD-003",
        title: 'Graphic T-Shirt',
        date: 'March 12, 2024',
        amount: 29.99,
        status: "in-transit"
      },
      {
        id: "ORD-004",
        title: 'Graphic T-Shirt',
        date: 'March 12, 2024',
        amount: 29.99,
        status: "cancelled"
      }
    ],
    deliveries: [
      {
        id: 1,
        type: 'Package Arriving',
        date: 'March 15, 2024',
      },
      {
        id: 2,
        type: 'Expected Delivery',
        date: 'March 18, 2024',
      }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <Header 
        title="My Profile"
        backLink="/dashboard"
        activeDate="March 2024"
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* User Info Section */}
        <div className="md:col-span-4">
          <GlowCard>
            <UserInfoCard
              name={userData.name}
              membershipType={userData.membershipType}
              avatar={userData.avatar}
            />
          </GlowCard>

          {/* Shopping Activity */}
          <GlowCard>
            <h3 className="text-lg font-bold text-white mb-4">Shopping Activity</h3>
            <div className="space-y-4">
              <StatCard icon={Package} value={userData.stats.totalOrders} label="Total Orders" description="Currently listed" color="blue" />
              <StatCard icon={Star} value={userData.stats.reviews} label="Reviews Given" description="Customer feedback" color="yellow" />
              <StatCard icon={Heart} value={userData.stats.wishlist} label="Wishlist Items" description="Saved for later" color="red" />
            </div>
          </GlowCard>
        </div>

        {/* Recent Orders Section */}
        <div className="md:col-span-8">
          <GlowCard>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-500" />
              Recent Orders
            </h3>
            <div className="space-y-4">
              {userData.recentOrders.map((order) => (
                <OrderItem
                  key={order.id}
                  id={order.id}
                  title={order.title}
                  date={order.date}
                  amount={order.amount}
                  status={order.status as "processing" | "delivered" | "cancelled" | "in-transit"}
                />
              ))}
            </div>
          </GlowCard>

          {/* Delivery Calendar */}
          <GlowCard>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-500" />
              Delivery Calendar
            </h3>
            <div className="space-y-4">
              {userData.deliveries.map((delivery) => (
                <DeliveryCalendar
                  key={delivery.id}
                  type={delivery.type}
                  date={delivery.date}
                />
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 