// src/app/billing/page.tsx
"use client";

import ConnectedWallet from "@/components/features/user/billing/connected-wallet";
import React from "react";

export default function Page() {
  return (
    <div className="space-y-6 p-6 bg-starshopBackground ">
      <ConnectedWallet />
    </div>
  );
}
