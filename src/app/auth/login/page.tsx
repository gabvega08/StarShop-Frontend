"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { MOCK_USERS } from "@/types/user.types";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | "guest">(
    "user"
  );
  const [email, setEmail] = useState<string>(MOCK_USERS.user.email);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update email when role changes
  useEffect(() => {
    setEmail(MOCK_USERS[selectedRole].email);
  }, [selectedRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // For demo purposes, just check if password is not empty
    // In a real app, you'd validate against actual credentials
    if (!password) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    // Simulating API call delay
    setTimeout(() => {
      try {
        // Find the user based on the email
        const foundUser = Object.values(MOCK_USERS).find(
          (user) => user.email === email
        );

        if (!foundUser) {
          setError("Invalid email or password");
          setIsLoading(false);
          return;
        }

        // In a real app, you'd validate the password here
        // For this demo, we'll assume it's correct if it's not empty
        login(foundUser);
        router.push("/dashboard");
      } catch (error) {
        setError("An error occurred during login");
        console.error("Login error:", error);
        setIsLoading(false);
      }
    }, 800); // Simulated delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Sign In to StarShop</h1>
          <p className="mt-2 text-gray-400">
            Enter your credentials to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Select Account Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["admin", "user", "guest"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`py-2 px-4 rounded-md text-sm font-medium transition
                    ${
                      selectedRole === role
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  onClick={() => setSelectedRole(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                         ${
                           isLoading
                             ? "bg-purple-700 cursor-not-allowed"
                             : "bg-purple-600 hover:bg-purple-700"
                         } 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          <p>Demo Credentials:</p>
          <p className="font-mono mt-1">
            Email: {MOCK_USERS[selectedRole].email}
          </p>
          <p className="font-mono">Password: (any password will work)</p>
        </div>
      </div>
    </div>
  );
}
