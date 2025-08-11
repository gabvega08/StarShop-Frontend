export function WhyChoose() {
  const features = [
    {
      icon: "🔗",
      iconBg: "bg-gradient-to-br from-[#925ff7] to-[#5478f6]",
      title: "Blockchain Powered",
      description: "Built on Stellar blockchain for maximum security, transparency, and trust in every transaction.",
    },
    {
      icon: "🎨",
      iconBg: "bg-gradient-to-br from-[#348ee5] to-[#1cadb6]",
      title: "Exclusive NFTs",
      description: "Receive unique digital collectibles with every purchase. Build your collection while shopping.",
    },
    {
      icon: "🛡️",
      iconBg: "bg-gradient-to-br from-[#17bb98] to-[#1fc265]",
      title: "Verified Sellers",
      description: "All sellers are verified and earn milestone NFTs that showcase their credibility and success.",
    },
    {
      icon: "⚡",
      iconBg: "bg-gradient-to-br from-[#54614a] to-[#b0b821]",
      title: "Instant Transactions",
      description: "Lightning-fast payments with minimal fees thanks to Stellar's efficient blockchain technology.",
    },
    {
      icon: "🌐",
      iconBg: "bg-gradient-to-br from-[#eda60a] to-[#f58413]",
      title: "Global Marketplace",
      description: "Connect with buyers and sellers worldwide in a truly decentralized marketplace ecosystem.",
    },
    {
      icon: "📊",
      iconBg: "bg-gradient-to-br from-[#f76822] to-[#f14f3a]",
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics to help businesses grow and optimize their performance.",
    },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
            <span className="text-yellow-400">✨</span>
            <span className="text-white text-sm font-medium">Why Choose StarShop</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Revolutionary Features for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Modern Commerce
            </span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Experience the future of e-commerce with cutting-edge blockchain technology, exclusive NFT rewards, and a
            transparent marketplace ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#252433] border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-colors duration-300"
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">{feature.title}</h3>

              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
