"use client";

import React, { createContext, useState, useEffect } from "react";
import { UserSession } from "@/types/user.types";
import { securelyStoreJWT, retrieveSecureJWT } from "@/utils/encryptJWT";

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setUser: (user: UserSession) => void;
  setRole: (role: "admin" | "user" | "guest") => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await retrieveSecureJWT();

        if (token) {
          const storedUser = localStorage.getItem("user_data");

          if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as UserSession;
            if (parsedUser.token === token) {
              setUserState(parsedUser);
              setIsAuthenticated(true);
            }
          }
        } else {
          setUserState(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user_data");
        }
      } catch (error) {
        console.error("Failed to load authenticated user:", error);
        // Clean up in case of error
        setUserState(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user_data");
      }
    };

    loadUserData();
  }, []);

  const login = async (userData: UserSession) => {
    try {
      // Store user data without the sensitive token
      const userDataForStorage = { ...userData };
      localStorage.setItem("user_data", JSON.stringify(userDataForStorage));

      // Encrypt and store JWT token separately
      await securelyStoreJWT(userData.token);

      // Update state
      setUserState(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);

    // Clear stored data
    localStorage.removeItem("user_data");
    localStorage.removeItem("encrypted_jwt");
  };

  const setUser = async (userData: UserSession) => {
    try {
      // Store user data
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Encrypt and store JWT token
      await securelyStoreJWT(userData.token);

      // Update state
      setUserState(userData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const setRole = async (role: "admin" | "user" | "guest") => {
    if (user) {
      const updatedUser = { ...user, role };
      await setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        setUser,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
