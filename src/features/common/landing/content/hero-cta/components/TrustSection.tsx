interface TrustSectionProps {
  title: string;
  companies: { name: string }[];
  indicators: {
    icon: string;
    text: string;
    color: string;
  }[];
}

export function TrustSection({
  title,
  companies,
  indicators,
}: TrustSectionProps) {
  return (
    <div className="mt-20">
      <div className="relative bg-gradient-to-br from-purple-600/20 via-blue-600/15 to-teal-500/20 backdrop-blur-lg rounded-3xl p-12 border border-purple-400/30 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M20 20l10-10v10h10l-10 10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Additional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-blue-500/5"></div>

        {/* Floating Elements */}
        <div className="absolute top-4 left-8 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 right-12 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-8 w-4 h-4 bg-teal-400/25 rounded-full animate-ping delay-500"></div>

        <div className="relative z-10 text-center">
          <p className="text-white/80 text-xl mb-10 font-medium">{title}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <div
                key={index}
                className="group relative px-6 py-4 bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 rounded-xl backdrop-blur-sm border border-purple-300/20 hover:border-purple-400/50 transition-all duration-200 cursor-pointer transform hover:scale-105"
              >
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200"></div>

                <span className="relative z-10 text-white/70 group-hover:text-white font-semibold text-sm transition-colors duration-200">
                  {company.name}
                </span>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-200"></div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-white/50">
            {indicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 ${indicator.color} rounded-full ${index === 0 ? 'animate-pulse' : ''}`}
                ></div>
                <span>{indicator.text}</span>
                {index < indicators.length - 1 && (
                  <div className="w-px h-4 bg-white/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
