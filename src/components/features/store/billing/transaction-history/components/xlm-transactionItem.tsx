import { ExternalLinkIcon } from 'lucide-react'

import React from 'react'

interface Transaction {
  title: string;
  date: string;
  amount: string;
  status: string;
}

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    return (
        <div className="text-card-foreground shadow-sm cursor-pointer bg-[#181728]/50 p-4 rounded-lg transition-colors hover:bg-[#181728]">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="text-base font-medium text-white">{transaction.title}</h4>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
                <div className="flex items-center gap-7">
                    <div className="text-right">
                        <p className="text-lg font-semibold text-white">{transaction.amount}</p>
                        <p className="text-sm text-emerald-400">{transaction.status}</p>
                    </div>
                    <ExternalLinkIcon className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
    )
}

export default TransactionItem