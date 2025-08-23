export interface Benefit {
    icon: string;
    text: string;
  }
  
  export interface CtaButton {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
    className: string;
    icon?: React.ReactNode;
  }
  
  export interface InteractiveCard {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    offset?: string;
  }
  
  export interface TrustCompany {
    name: string;
  }
  
  export interface CtaContent {
    badge: {
      icon: string;
      text: string;
    };
    title: {
      main: string;
      highlight: string;
      suffix: string;
    };
    description: string;
    benefits: Benefit[];
    buttons: CtaButton[];
    interactiveCards: InteractiveCard[];
    trustSection: {
      title: string;
      companies: TrustCompany[];
      indicators: {
        icon: string;
        text: string;
        color: string;
      }[];
    };
  }
  
  export const CTA_CONTENT: CtaContent = {
    badge: {
      icon: '🚀',
      text: 'Ready to Launch?'
    },
    title: {
      main: 'Start Your',
      highlight: 'Blockchain',
      suffix: 'Commerce Journey'
    },
    description: 'Join the revolution of transparent, secure, and rewarding e-commerce. Whether you\'re a seller looking to build trust or a buyer seeking unique experiences, StarShop is your gateway to the future.',
    benefits: [
      {
        icon: '✅',
        text: 'No setup fees - Start selling immediately',
      },
      {
        icon: '🎁',
        text: 'Exclusive NFT rewards for every transaction',
      },
      { 
        icon: '🔒', 
        text: 'Blockchain-verified transactions' 
      },
      { 
        icon: '📈', 
        text: 'Advanced analytics and insights' 
      },
    ],
    buttons: [
      {
        text: 'Get Started Now',
        href: '/register',
        variant: 'primary',
        className: 'group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-102 shadow-xl hover:shadow-2xl will-change-transform'
      },
      {
        text: 'Learn More',
        href: '#features',
        variant: 'secondary',
        className: 'inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-200'
      }
    ],
    interactiveCards: [
      {
        icon: '🏪',
        title: 'For Sellers',
        description: 'Build trust, earn NFTs',
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        icon: '🛍️',
        title: 'For Buyers',
        description: 'Shop safely, collect NFTs',
        gradient: 'from-blue-500 to-teal-500',
        offset: 'ml-8'
      },
      {
        icon: '⛓️',
        title: 'Blockchain Powered',
        description: 'Secure & transparent',
        gradient: 'from-green-500 to-blue-500'
      }
    ],
    trustSection: {
      title: 'Trusted by innovative businesses worldwide',
      companies: [
        { name: 'TechCorp' },
        { name: 'InnovateLab' },
        { name: 'FutureTech' },
        { name: 'BlockchainCo' },
        { name: 'CryptoStart' },
        { name: 'WebNext' }
      ],
      indicators: [
        {
          icon: '●',
          text: '24/7 Uptime',
          color: 'bg-green-400'
        },
        {
          icon: '●',
          text: 'Enterprise Grade',
          color: 'bg-blue-400'
        },
        {
          icon: '●',
          text: 'Blockchain Secured',
          color: 'bg-purple-400'
        }
      ]
    }
  };