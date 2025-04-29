"use client";

import { useContext } from "react";
import AuthContext from "@/context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return {
    user: context.user,
    role: context.user?.role || "guest",
    isAuthenticated: context.isAuthenticated,
    token: context.user?.token || null,
    login: context.login,
    logout: context.logout,
    setUser: context.setUser,
    setRole: context.setRole,
  };
};

export default useAuth;
