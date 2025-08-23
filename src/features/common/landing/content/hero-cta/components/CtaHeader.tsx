interface CtaHeaderProps {
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
  }
  
  export function CtaHeader({ badge, title, description }: CtaHeaderProps) {
    return (
      <div className="text-white">
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
          <span className="text-sm font-medium">{badge.icon} {badge.text}</span>
        </div>
  
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title.main}
          <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {' '}
            {title.highlight}
          </span>
          <br />
          {title.suffix}
        </h2>
  
        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
          {description}
        </p>
      </div>
    );
  }