'use client';
import { Home, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function Navigation() {
  return (
    <div className="flex items-center justify-between mb-6 p-4 border-b border-gray-700">
      {/* Left side - Navigation links */}
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center"
        >
          <ShoppingBag className="h-4 w-4" />
          Marketplace
        </Button>
      </div>

      {/* Right side - User profile */}
      <Button
        variant="ghost"
        className="text-gray-300 bg-white/10 rounded-full hover:text-white hover:bg-gray-800 flex items-center"
      >
        <User className="h-4 w-4" />
        aguillar1x
      </Button>
    </div>
  );
}
