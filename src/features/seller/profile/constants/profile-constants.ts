import { Shield, Star, Truck, Crown } from 'lucide-react';
import { Achievement, Metric, Category } from '../types/profile';

// Achievements
export const achievements: Achievement[] = [
  {
    title: 'Verified Seller',
    description: 'Authenticated business',
    icon: Shield,
    color: 'text-green-400',
  },
  {
    title: 'Top Rated',
    description: 'Consistent 5-star ratings',
    icon: Star,
    color: 'text-yellow-400',
  },
  {
    title: 'Fast Shipper',
    description: 'Quick delivery times',
    icon: Truck,
    color: 'text-blue-400',
  },
  {
    title: 'Premium Store',
    description: 'Quality products & service',
    icon: Crown,
    color: 'text-purple-400',
  },
];

// Metrics
export const metrics: Metric[] = [
  { label: 'Total Products', value: '156' },
  { label: 'Active Orders', value: '23' },
  { label: 'Customer Rating', value: '4.8/5.0' },
];

// Categories
export const categories: Category[] = [
  {
    name: 'Streetwear',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    name: 'Urban Fashion',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    name: 'Accessories',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    name: 'Footwear',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  {
    name: 'Limited Editions',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  {
    name: 'Sustainable',
    color: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  },
];
