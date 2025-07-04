export interface NFT {
  id: string;
  title: string;
  store: string;
  date: string;
  category: string;
  image: string;
  color: string;
  price?: number;
  currency?: string;
}

export interface NFTStats {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export interface NFTFilter {
  id: string;
  label: string;
  active: boolean;
}

export interface NFTTab {
  id: string;
  label: string;
  active: boolean;
}

export interface ExclusiveReward {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  buttonText: string;
}

export interface ValuableNFT {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  color: string;
}
