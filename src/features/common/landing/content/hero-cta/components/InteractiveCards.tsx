import Image from 'next/image';
import { InteractiveCard } from '../constants/cta';

interface InteractiveCardsProps {
  cards: InteractiveCard[];
}

export function InteractiveCards({ cards }: InteractiveCardsProps) {
  return (
    <div className="relative">
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Floating Cards */}
        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-r ${card.gradient} rounded-2xl p-6 transform hover:scale-102 transition-all duration-200 cursor-pointer will-change-transform ${card.offset || ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Logo */}
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
          <Image
            src="/starshop-logos/StarShop-Logo.svg"
            alt="StarShop"
            width={40}
            height={40}
            className="filter brightness-0"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400/30 rounded-full animate-bounce delay-100"></div>
      <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-1/2 -left-8 w-6 h-6 bg-teal-400/40 rounded-full animate-ping delay-500"></div>
    </div>
  );
}
