export interface ProfileCardProps {
  type: 'buyer' | 'seller';
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}
