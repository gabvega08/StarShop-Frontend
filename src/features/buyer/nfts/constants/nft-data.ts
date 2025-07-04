import { NFT, NFTStats, NFTFilter, NFTTab, ExclusiveReward, ValuableNFT } from '../types/nft';

export const MOCK_STATS: NFTStats[] = [
  {
    label: 'Total NFTs',
    value: 12,
    icon: 'Gem',
    color: 'text-purple-500',
  },
  {
    label: 'Clothing Rewards',
    value: 8,
    icon: 'Shirt',
    color: 'text-blue-500',
  },
  {
    label: 'Redeemable Coupons',
    value: 3,
    icon: 'Ticket',
    color: 'text-yellow-500',
  },
  {
    label: 'Estimated Value',
    value: '450 XLM',
    icon: 'DollarSign',
    color: 'text-green-500',
  },
];

export const NFT_TABS: NFTTab[] = [
  { id: 'all', label: 'All NFTs', active: true },
  { id: 'clothing', label: 'Clothing Rewards', active: false },
  { id: 'achievements', label: 'Achievements', active: false },
  { id: 'exclusive', label: 'Exclusive Items', active: false },
];

export const NFT_FILTERS: NFTFilter[] = [
  { id: 'grid', label: 'Grid', active: true },
  { id: 'list', label: 'List', active: false },
];

export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    title: 'Limited Edition Hoodie',
    store: 'StarShop',
    date: '2024-01-15',
    category: 'Clothing',
    image: '/api/placeholder/300/200',
    color: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Premium Sneakers',
    store: 'StarShop',
    date: '2024-01-10',
    category: 'Footwear',
    image: '/api/placeholder/300/200',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    title: 'Exclusive T-Shirt',
    store: 'StarShop',
    date: '2024-01-08',
    category: 'Clothing',
    image: '/api/placeholder/300/200',
    color: 'bg-pink-500',
  },
  {
    id: '4',
    title: 'Collector Cap',
    store: 'StarShop',
    date: '2024-01-05',
    category: 'Accessories',
    image: '/api/placeholder/300/200',
    color: 'bg-orange-500',
  },
  {
    id: '5',
    title: 'Rare Jacket',
    store: 'StarShop',
    date: '2024-01-03',
    category: 'Clothing',
    image: '/api/placeholder/300/200',
    color: 'bg-purple-500',
  },
  {
    id: '6',
    title: 'Limited Watch',
    store: 'StarShop',
    date: '2024-01-01',
    category: 'Accessories',
    image: '/api/placeholder/300/200',
    color: 'bg-red-500',
  },
];

export const MOCK_EXCLUSIVE_REWARDS: ExclusiveReward[] = [
  {
    id: '1',
    title: 'Purchase Rewards',
    description: '2 NFTs available',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    buttonText: 'View Upcoming Rewards',
  },
  {
    id: '2',
    title: 'NFT Coupons & Vouchers',
    description: 'Redeem your coupons',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    buttonText: 'Redeem Coupon',
  },
];

export const MOCK_VALUABLE_NFTS: ValuableNFT[] = [
  {
    id: '1',
    title: 'Rare Hoodie Collection',
    price: 150,
    currency: 'XLM',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
  },
  {
    id: '2',
    title: 'Limited Sneakers',
    price: 200,
    currency: 'XLM',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-green-500 to-blue-500',
  },
  {
    id: '3',
    title: 'Exclusive T-Shirt',
    price: 75,
    currency: 'XLM',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-pink-500 to-red-500',
  },
  {
    id: '4',
    title: 'Collector Cap',
    price: 50,
    currency: 'XLM',
    image: '/api/placeholder/200/150',
    color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
  },
]; 