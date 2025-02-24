import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Folder, RefreshCw, Wallet } from "lucide-react";
import Input from "../ui/Input";

const ConnectedWallet = () => {
  const transactions = [
    {
      date: "Mar 1, 2024",
      type: "Premium Store Subscription",
      amount: "50 XLM",
      status: "Confirmed",
    },
    {
      date: "Feb 1, 2024",
      type: "Premium Store Subscription",
      amount: "50 XLM",
      status: "Confirmed",
    },
    {
      date: "Jan 1, 2024",
      type: "Premium Store Subscription",
      amount: "50 XLM",
      status: "Confirmed",
    },
  ];

  return (
    <div className="space-y-6 p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Stellar XLM Billing
        </h1>
        <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
          + Connect Stellar Wallet
        </Button>
      </div>

      {/* Connected Stellar Wallet Section */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg font-semibold text-white">
            Connected Stellar Wallet
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-opacity-30 bg-zinc-800 p-3 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex items-center gap-4">
              <div>
                <Wallet className="text-purple-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Wallet Address</div>
                <div className="text-white font-mono">GBCXF...AZTLA</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-transparent text-sm px-2 py-1 h-auto"
              >
                <Copy size={16} className="mr-2 text-white" /> Copy
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-transparent text-sm px-2 py-1 h-auto"
              >
                <ExternalLink size={16} className="mr-2 text-white" /> View
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-opacity-30 bg-zinc-800 p-3 rounded-lg space-y-3 sm:space-y-0">
            <div>
              <div className="text-sm text-gray-400">XLM Balance</div>
              <div className="text-xl sm:text-2xl font-semibold text-purple-500">
                1,234.5678 XLM
              </div>
            </div>
            <Button
              variant="default"
              className="text-white hover:text-gray-600 w-full sm:w-auto"
            >
              Refresh Balance
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            XLM Transaction History
          </h2>
          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-opacity-30 bg-zinc-800 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-0"
              >
                <div>
                  <div className="text-white">{transaction.type}</div>
                  <div className="text-sm text-gray-400">
                    {transaction.date}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                  <div className="text-white">{transaction.amount}</div>
                  <div className="text-emerald-500 text-sm">
                    {transaction.status}
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-white cursor-pointer hover:text-gray-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Plan Section */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Current Plan
          </h2>
          <div className="bg-purple-900/20 border border-purple-900/50 p-4 sm:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Premium Store Plan
                </h3>
                <p className="text-gray-400">
                  Unlimited products, priority support, and advanced analytics
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-purple-500 text-lg font-semibold">
                  50 XLM / month
                </div>
                <Button
                  variant="default"
                  className="text-white hover:text-gray-400 text-sm px-2 py-1 h-auto mt-1"
                >
                  Change Plan
                </Button>
              </div>
            </div>
            <div className="h-px w-full bg-purple-900/50 my-4" />

            <div className="text-sm text-gray-400">
              Next billing date: April 1, 2024
            </div>
          </div>
        </div>
      </div>

      {/* Manual Payment Section */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Make a Manual Payment
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="XLM Amount"
                  id="xlm-amount"
                  name="xlmAmount"
                  type="text"
                  placeholder="0.0"
                  className="bg-opacity-30 bg-zinc-800 border border-zinc-700 text-white placeholder:text-gray-400"
                  labelClassName="text-xs text-gray-400"
                  centered={false}
                />
              </div>
              <div>
                <Input
                  label="Memo (Optional)"
                  id="memo"
                  name="memo"
                  type="text"
                  placeholder="Enter memo"
                  className="bg-opacity-30 bg-zinc-800 border border-zinc-700 text-white placeholder:text-gray-400"
                  labelClassName="text-xs text-gray-400"
                  centered={false}
                />
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Send XLM Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedWallet;
