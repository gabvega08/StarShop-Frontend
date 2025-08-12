
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  companyUrl: string;
  avatar: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Founder at',
    company: 'Eco Artisans',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'StarShop revolutionized our business! The NFT rewards create amazing customer loyalty, and the blockchain transparency builds trust like never before.',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Customer at',
    company: 'NFT Collector',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'I love collecting the unique NFTs with every purchase. It’s like getting a digital souvenir that has real value. The shopping experience is seamless!',
  },
  {
    name: 'Elenaetrov',
    role: 'Store Owner at',
    company: 'Handmade Haven',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'The analytics dashboard gives me insights I never had before. Stellar blockchain makes international payments effortless. Best decision for my business!',
  },
  {
    name: 'David Kim',
    role: 'Tech Enthusiast at',
    company: 'Blockchain Advocate',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'Finally, a marketplace that leverages blockchain properly! Fast transactions, low fees, and the gamification with NFTs makes shopping addictive.',
  },
  {
    name: 'Lisa Thompson',
    role: 'Small Business Owner at',
    company: 'Vintage Finds',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'The verification system builds incredible trust with customers. My sales increased 300% since joining StarShop. The community is amazing!',
  },
  {
    name: 'Alex Johnson',
    role: 'Early Adopter at',
    company: 'Crypto Enthusiast',
    companyUrl: '#',
    avatar: '/images/user-profile/avatar.jpg',
    quote:
      'StarShop bridges traditional e-commerce with Web3 perfectly. The user experience is smooth, and earning NFTs makes every purchase special.',
  },
];
