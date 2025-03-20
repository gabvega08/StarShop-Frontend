interface Achievement {
  title: string;
  description: string;
}

export function StoreAchievements() {
  const achievements: Achievement[] = [
    { title: "Verified Seller", description: "Authenticated business" },
    { title: "Top Rated", description: "Consistent 5-star ratings" },
    { title: "Fast Shipper", description: "Quick delivery times" },
    { title: "Premium Store", description: "Quality products & service" },
  ];

  return (
    <div className="rounded-lg border border-white/50 bg-[#0F0E1D] p-6 shadow-[0_0_8px_rgba(255,255,255,0.2)]">
      <h2 className="text-lg font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={i} className="text-center p-4 rounded-lg bg-white/5">
            <div className="font-medium">{achievement.title}</div>
            <div className="text-sm text-white/60 mt-1">
              {achievement.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
