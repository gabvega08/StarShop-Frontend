// For achievements
import { LucideIcon } from 'lucide-react';

// For categories
export interface Category {
  name: string;
  color: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// For metrics
export interface Metric {
  label: string;
  value: string;
}
