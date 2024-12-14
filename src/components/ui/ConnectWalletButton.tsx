"use client";
import { useWalletUtils } from "@/hooks/useWalletUtils";
import { useWalletStore } from "@/store/walletStore";

export const ConnectWalletButton = () => {
  const { handleConnect, handleDisconnect } = useWalletUtils();
  const { address } = useWalletStore();

  return (
    <div>
      {address ? (
        <>
          <div className="flex gap-5 ml-auto">
            <button
              type="button"
              onClick={handleDisconnect}
              className="mt-[30px] md:mt-[50px] font-bold inline-block bg-white text-primary-purple px-[10px] md:px-[40px] py-[15px] rounded-[25px] hover:bg-purple-100 leading-[22.72px] text-left cursor-pointer"
            >
              Disconnect Wallet
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-5 ml-auto">
          <button
            type="button"
            onClick={handleConnect}
            className="mt-[30px] md:mt-[50px] font-bold inline-block bg-white text-primary-purple px-[10px] md:px-[40px] py-[15px] rounded-[25px] hover:bg-purple-100 leading-[22.72px] text-left cursor-pointer"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};
