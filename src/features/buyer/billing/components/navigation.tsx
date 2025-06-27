'use client';
import { Home, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  user?: {
    username: string;
    avatar?: string;
  };
}

export function Navigation({ user }: NavigationProps) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6 p-4 border-b border-gray-700">
      {/* Left side - Navigation links */}
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center"
          onClick={() => router.push('/buyer/home')}
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center"
          onClick={() => router.push('/buyer/marketplace')}
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
        {user?.username || 'Guest'}
      </Button>
    </div>
  );
}
