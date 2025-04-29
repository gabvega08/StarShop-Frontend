"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";

export default function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setIsOpen(false);
  };

  const handleOpenProfile = () => {
    router.push("/profile");
    setIsOpen(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={() => router.push("/auth/login")}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-purple-400 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <User size={18} />
        </div>
        <span className="hidden md:block">{user.name}</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 capitalize">
          {user.role}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={handleOpenProfile}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20 flex items-center"
            >
              <LogOut size={16} className="mr-2" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
