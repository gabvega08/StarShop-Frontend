
export interface Transaction {
    id: number
    title: string
    date: string
    amount: string
    status: string
    positive?: boolean
    negative?: boolean
  }
  
  export const allTransactions: Transaction[] = [
    {
      id: 1,
      title: "Premium Hoodie Purchase",
      date: "Mar 15, 2024",
      amount: "-85 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 2,
      title: "Added Funds to Wallet",
      date: "Mar 10, 2024",
      amount: "+200 XLM",
      status: "Completed",
      positive: true,
    },
    {
      id: 3,
      title: "Urban Sneakers Purchase",
      date: "Mar 5, 2024",
      amount: "-120 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 4,
      title: "Monthly Subscription",
      date: "Feb 28, 2024",
      amount: "-25 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 5,
      title: "NFT Purchase",
      date: "Feb 20, 2024",
      amount: "-50 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 6,
      title: "Referral Bonus",
      date: "Feb 15, 2024",
      amount: "+30 XLM",
      status: "Completed",
      positive: true,
    },
    {
      id: 7,
      title: "Digital Art Purchase",
      date: "Feb 10, 2024",
      amount: "-75 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 8,
      title: "Staking Rewards",
      date: "Feb 5, 2024",
      amount: "+15 XLM",
      status: "Completed",
      positive: true,
    },
    {
      id: 9,
      title: "Premium Theme Purchase",
      date: "Jan 28, 2024",
      amount: "-40 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 10,
      title: "Trading Profit",
      date: "Jan 20, 2024",
      amount: "+65 XLM",
      status: "Completed",
      positive: true,
    },
    {
      id: 11,
      title: "Membership Renewal",
      date: "Jan 15, 2024",
      amount: "-25 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 12,
      title: "Airdrop Received",
      date: "Jan 10, 2024",
      amount: "+10 XLM",
      status: "Completed",
      positive: true,
    },
  ]
  
  export const getTransactions = (limit?: number): Transaction[] => {
    if (limit) {
      return allTransactions.slice(0, limit)
    }
    return allTransactions
  }
  
  export const searchTransactions = (query: string): Transaction[] => {
    return allTransactions.filter((transaction) => transaction.title.toLowerCase().includes(query.toLowerCase()))
  }
  
  