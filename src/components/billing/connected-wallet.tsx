import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Wallet } from "lucide-react";

const ConnectedWallet = () => {
  
  return (
    <div className="space-y-6 p-3 sm:p-6 bg-starshopBackground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Connected Stellar Wallet
        </h1>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        

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
    </div>
  );
};

export default ConnectedWallet;
